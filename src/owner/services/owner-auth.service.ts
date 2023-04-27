import * as dotenv from 'dotenv';
dotenv.config();
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  OwnerSignInType,
  TempOwnerSignUpType,
  VerifyPhoneType,
} from 'src/types/type';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { OwnerAuth } from 'src/owner/entities/OwnerAuth.entity';
import { TempOwnerAuth } from 'src/owner/entities/TempOwnerAuth.entity';
@Injectable()
export class OwnerAuthService {
  constructor(
    @InjectRepository(OwnerAuth)
    private ownerAuthRepository: Repository<OwnerAuth>,
    @InjectRepository(TempOwnerAuth)
    private tempOwnerAuthRepository: Repository<TempOwnerAuth>,
  ) {}

  async check_user_exists(tempSignup: TempOwnerSignUpType): Promise<Boolean> {
    const { firstName, phoneNumber } = tempSignup;
    const findUser = await this.tempOwnerAuthRepository.findOne({
      where: {
        firstName: firstName,
        phoneNumber: phoneNumber,
      },
    });
    if (findUser) return true;
    else {
      const foundUser = await this.ownerAuthRepository.findOne({
        where: {
          firstName: firstName,
          phoneNumber: phoneNumber,
        },
      });
      if (foundUser) return true;
      else {
        return false;
      }
    }
  }
  async checkRole(id: string): Promise<Boolean> {
    if (!id) {
      return false;
    }
    let foundUser = await this.ownerAuthRepository
      .createQueryBuilder('owner_auth')
      .where('owner_auth.id=:id', { id: id })
      .getOne();
    if (!foundUser) return false;
    if (foundUser.role === 'owner') return true;
  }

  async sign_up(tempSignup: TempOwnerSignUpType) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(tempSignup.password, salt);
    const { password, ...everyThingElse } = tempSignup;

    const newUser = this.tempOwnerAuthRepository.create({
      ...everyThingElse,
      password: hash,
    });

    return this.tempOwnerAuthRepository.save(newUser);
  }
  async findUser(phoneNumber: string) {
    const findUser = await this.tempOwnerAuthRepository.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });
    if (!findUser) {
      throw new HttpException('Invalid phone number!', HttpStatus.NOT_FOUND);
    }
    return findUser;
  }
  async findOwner(phoneNumber: string) {
    const findUser = await this.ownerAuthRepository.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });
    if (!findUser) {
      throw new HttpException(
        'You must verify your phone!',
        HttpStatus.NOT_FOUND,
      );
    }
    return findUser;
  }
  async verifyUser(
    gOtp: string,
    checkTmp: TempOwnerAuth,
    verifyPhoneType: VerifyPhoneType,
  ) {
    let verifyCode = verifyPhoneType?.code?.toString();
    //console.log('verify code', verifyCode);
    if (gOtp === verifyCode) {
      let { isVerified, id, ...others } = checkTmp;
      let newUser = this.ownerAuthRepository.create({
        ...others,
      });
      console.log(newUser);
      this.ownerAuthRepository.save(newUser);
      this.tempOwnerAuthRepository.delete({
        id: checkTmp.id,
      });
    } else {
      throw new HttpException('Incorrect Code!', HttpStatus.BAD_REQUEST);
    }
  }

  async sign_in(signin: OwnerSignInType, foundAuth: OwnerAuth) {
    const { phoneNumber, password } = signin;

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
