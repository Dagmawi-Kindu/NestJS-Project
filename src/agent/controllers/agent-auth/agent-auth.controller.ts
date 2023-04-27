import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AgentAuthService } from 'src/agent/services/agent-auth/agent-auth.service';
import {
  AgentSignInDto,
  AgentSignUpDto,
  TempAgentSignUpDto,
  VerifyPhoneDto,
} from 'src/agent/dtos/AgentAuth.dto';
import { SignupInterceptor } from 'src/interceptors/signup.interceptor';

import { Cache } from 'cache-manager';
import { diskStorageAgentItems } from 'utils/multerOptions';
import { FileFilter } from 'src/customer/filters/file.filter';

@Controller('agent-auth')
export class AgentAuthController {
  constructor(
    private agentAuthService: AgentAuthService, // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @Post('signup')
  @UsePipes(ValidationPipe)
  @UseFilters(FileFilter)
  @UseInterceptors(SignupInterceptor)
  @UseInterceptors(FileInterceptor('kebeleID', diskStorageAgentItems))
  async signUp(
    @UploadedFile() file: Express.Multer.File,
    @Body() tempAgentSignUpDto: TempAgentSignUpDto,
  ) {
    if (file) {
      tempAgentSignUpDto.kebeleID = file.filename;
    }
    let checkUser = await this.agentAuthService.check_user_exists(
      tempAgentSignUpDto,
    );

    if (checkUser === false) {
      return this.agentAuthService.sign_up(tempAgentSignUpDto);
    } else {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }
  }
  @Post('verify/:phone/:gOtp')
  @UsePipes(ValidationPipe)
  async verifyPhoneNumber(
    @Param('phone') phoneNumber: string,
    @Param('gOtp') generatedOtp: number,
    @Body() verifyPhoneDto: VerifyPhoneDto,
  ) {
    let checkUser = await this.agentAuthService.findUser(phoneNumber);
    let gOtp: string = generatedOtp.toString();

    console.log('user', checkUser);

    return this.agentAuthService.verifyUser(gOtp, checkUser, verifyPhoneDto);
  }
  @Get('new/:phone')
  async generateNew(@Param('phone') phoneNumber: string) {
    let gOtp = await this.agentAuthService.generateOTP();
    await this.agentAuthService.sendSms(gOtp, phoneNumber);

    return gOtp;
  }
  @Post('signin')
  @UsePipes(ValidationPipe)
  async sign_in(@Body() agentSignin: AgentSignInDto) {
    let foundUser = await this.agentAuthService.findAgent(
      agentSignin.phoneNumber,
    );
    if (foundUser)
      return await this.agentAuthService.sign_in(agentSignin, foundUser);
    else {
      throw new HttpException(
        "Sorry, the entered credential doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
