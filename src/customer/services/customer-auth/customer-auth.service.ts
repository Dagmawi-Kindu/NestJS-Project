import * as dotenv from 'dotenv';
dotenv.config();
import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerAuth } from 'src/customer/entities/CustomerAuth.entity';
import { SignInType, SignUpType } from 'src/types/type';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

@Injectable()
export class CustomerAuthService {
  constructor(
    @InjectRepository(CustomerAuth)
    private customerAuthRepository: Repository<CustomerAuth>,
  ) {}

  async getAllUsers() {
    throw new HttpException('My exception', HttpStatus.BAD_REQUEST);
    //return 'no exception lads';
    // return this.customerAuthRepository.find();
  }
  async check_user_exists(signup: SignUpType) {
    const { firstName, phoneNumber } = signup;
    const findUser = await this.customerAuthRepository.findOne({
      where: {
        firstName: firstName,
        phoneNumber: phoneNumber,
      },
    });

    return findUser;
  }
  async checkRole(id: string): Promise<Boolean> {
    if (!id) {
      return false;
    }
    let foundUser = await this.customerAuthRepository
      .createQueryBuilder('customer_auth')
      .where('customer_auth.id=:id', { id: id })
      .getOne();
    if (!foundUser) return false;
    if (foundUser.role === 'customer') return true;
  }

  async sign_up(signup: SignUpType) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(signup.password, salt);
    const { password, ...everyThingElse } = signup;

    const newUser = this.customerAuthRepository.create({
      ...everyThingElse,
      password: hash,
    });

    return this.customerAuthRepository.save(newUser);
  }

  async sign_in(signin: SignInType) {
    const { phoneNumber, password } = signin;
    //checks if the user exists
    let foundAuth = await this.customerAuthRepository.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (!foundAuth) {
      throw new HttpException(
        "Sorry, the entered credential doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }

    //checks if the given password is correct
    const checkPassword = await bcrypt.compare(password, foundAuth.password);
    if (!checkPassword) {
      throw new HttpException('Incorrect password!', HttpStatus.BAD_REQUEST);
    }
    const { password: thePassword, ...remaining } = foundAuth;

    let token = jwt.sign(
      {
        id: foundAuth.id,
      },
      process.env.JWT_KEY,
    );

    return {
      ...remaining,
      access_token: token,
    };
  }
}
