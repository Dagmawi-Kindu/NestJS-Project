import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignupInterceptor } from 'src/interceptors/signup.interceptor';
import { CustomerAuthService } from 'src/customer/services/customer-auth/customer-auth.service';
import { SignInDto, SignUpDto } from 'src/customer/dtos/CustomerAuth.dto';
import { AuthGuard } from 'src/customer/guards/auth.guard';
import { UseFilters, UseGuards } from '@nestjs/common/decorators';

@Controller('customer-auth')
export class CustomerAuthController {
  constructor(private customerAuthService: CustomerAuthService) {}
  @Post('signup')
  @UseInterceptors(SignupInterceptor)
  @UsePipes(ValidationPipe)
  async sign_up(@Body() signUpDto: SignUpDto) {
    const checkUser = await this.customerAuthService.check_user_exists(
      signUpDto,
    );
    if (checkUser) {
      throw new HttpException('User Already Exists!', HttpStatus.BAD_REQUEST);
    } else {
      return this.customerAuthService.sign_up(signUpDto);
    }
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  async sign_in(@Body() signInDto: SignInDto) {
    const checkUser = await this.customerAuthService.sign_in(signInDto);
    // console.log('Inside Controller', checkUser);
    return checkUser;
  }

  @Get('tryout')
  @UseGuards(AuthGuard)
  myFunction() {
    return this.customerAuthService.getAllUsers();
  }
}
