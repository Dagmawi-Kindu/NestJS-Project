import * as dotenv from 'dotenv';
dotenv.config();
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentAuth } from 'src/agent/entities/AgentAuth.entity';
import {
  AgentSignInType,
  AgentSignUpType,
  TempAgentSignUpType,
  VerifyPhoneType,
} from 'src/types/type';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { sign } from 'crypto';
import axios from 'axios';
import { TempAgentAuth } from 'src/agent/entities/TempAgentAuth.entity';
@Injectable()
export class AgentAuthService {
  constructor(
    @InjectRepository(AgentAuth)
    private agentAuthRepository: Repository<AgentAuth>,
    @InjectRepository(TempAgentAuth)
    private tempAgentAuthRepository: Repository<TempAgentAuth>,
  ) {}

  async generateOTP() {
    let result = '';
    const chars = '1234560789';
    const charsLength = chars.length;
    let counter = 0;
    while (counter < 5) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
      counter += 1;
    }

    return result;
  }

  async sendSms(generatedOtp: string, phoneNumber: string) {
    await axios
      .get(
        `https://api.geezsms.com/api/v1/sms/send?token=${process.env.SMS_APIKEY}&phone=${phoneNumber}&msg=Here is your OTP:${generatedOtp}`,
      )
      .then((res) => {
        console.log('here we goo', res);
      });
  }
  async check_user_exists(tempSignup: TempAgentSignUpType): Promise<Boolean> {
    const { firstName, phoneNumber } = tempSignup;
    const findUser = await this.tempAgentAuthRepository.findOne({
      where: {
        firstName: firstName,
        phoneNumber: phoneNumber,
      },
    });
    if (findUser) return true;
    else {
      const foundUser = await this.agentAuthRepository.findOne({
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
    let foundUser = await this.agentAuthRepository
      .createQueryBuilder('agent_auth')
      .where('agent_auth.id=:id', { id: id })
      .getOne();
    if (!foundUser) return false;
    if (foundUser.role === 'agent') return true;
  }

  async sign_up(tempSignup: TempAgentSignUpType) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(tempSignup.password, salt);
    const { password, ...everyThingElse } = tempSignup;

    const newUser = this.tempAgentAuthRepository.create({
      ...everyThingElse,
      password: hash,
    });

    return this.tempAgentAuthRepository.save(newUser);
  }
  async findUser(phoneNumber: string) {
    const findUser = await this.tempAgentAuthRepository.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });
    if (!findUser) {
      throw new HttpException('Invalid phone number!', HttpStatus.NOT_FOUND);
    }
    return findUser;
  }
  async findAgent(phoneNumber: string) {
    const findUser = await this.agentAuthRepository.findOne({
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
    checkTmp: TempAgentAuth,
    verifyPhoneType: VerifyPhoneType,
  ) {
    let verifyCode = verifyPhoneType?.code?.toString();
    console.log('verify code', verifyCode);
    if (gOtp === verifyCode) {
      let { isVerified, id, ...others } = checkTmp;
      let newUser = this.agentAuthRepository.create({
        ...others,
      });
      this.agentAuthRepository.save(newUser);
      this.tempAgentAuthRepository.delete({
        id: checkTmp.id,
      });
    } else {
      throw new HttpException('Incorrect Code!', HttpStatus.BAD_REQUEST);
    }
  }

  async sign_in(signin: AgentSignInType, foundAuth: AgentAuth) {
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
