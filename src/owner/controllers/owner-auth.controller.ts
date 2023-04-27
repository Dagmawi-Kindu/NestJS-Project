import {
  Body,
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
import { VerifyPhoneDto } from 'src/agent/dtos/AgentAuth.dto';
import { AgentAuthService } from 'src/agent/services/agent-auth/agent-auth.service';
import { FileFilter } from 'src/customer/filters/file.filter';
import { SignupInterceptor } from 'src/interceptors/signup.interceptor';
import {
  OwnerSignInDto,
  TempOwnerSignUpDto,
} from 'src/owner/dtos/OwnerAuth.dto';
import { OwnerAuthService } from 'src/owner/services/owner-auth.service';
import { diskStorageOwnerItems } from 'utils/multerOptions';

@Controller('owner-auth')
export class OwnerAuthController {
  constructor(
    private ownerAuthService: OwnerAuthService, // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(AgentAuthService) private agentAuthService: AgentAuthService,
  ) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  @UseFilters(FileFilter)
  @UseInterceptors(SignupInterceptor)
  @UseInterceptors(FileInterceptor('tradeLiscence', diskStorageOwnerItems))
  async signUp(
    @UploadedFile() file: Express.Multer.File,
    @Body() tempOwnerSignUpDto: TempOwnerSignUpDto,
  ) {
    if (file) {
      tempOwnerSignUpDto.tradeLiscence = file.filename;
    }
    let checkUser = await this.ownerAuthService.check_user_exists(
      tempOwnerSignUpDto,
    );

    if (checkUser === false) {
      return this.ownerAuthService.sign_up(tempOwnerSignUpDto);
    } else {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }
  }
  @Post('verify/:phone/:gOtp')
  @UsePipes(ValidationPipe)
  async verifyPhoneNumber(
    @Param('phone') phoneNumber: string,
    @Param('gOtp') generatedOtp: string,
    @Body() verifyPhoneDto: VerifyPhoneDto,
  ) {
    let checkUser = await this.ownerAuthService.findUser(phoneNumber);

    return this.ownerAuthService.verifyUser(
      generatedOtp,
      checkUser,
      verifyPhoneDto,
    );
  }
  @Get('new/:phone')
  async generateNew(@Param('phone') phoneNumber: string) {
    let gOtp = await this.agentAuthService.generateOTP();
    await this.agentAuthService.sendSms(gOtp, phoneNumber);

    return gOtp;
  }
  @Post('signin')
  @UsePipes(ValidationPipe)
  async sign_in(@Body() ownerSignin: OwnerSignInDto) {
    let foundUser = await this.ownerAuthService.findOwner(
      ownerSignin.phoneNumber,
    );
    if (foundUser)
      return await this.ownerAuthService.sign_in(ownerSignin, foundUser);
    else {
      throw new HttpException(
        "Sorry, the entered credential doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
