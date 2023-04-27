import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerAuth } from 'src/customer/entities/CustomerAuth.entity';
import { Repository } from 'typeorm';
import { CustomerAuthService } from 'src/customer/services/customer-auth/customer-auth.service';
import { Inject } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(CustomerAuthService)
    private customerAuthService: CustomerAuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    console.log(req?.body?.authenticatedUser);
    if (
      await this.customerAuthService.checkRole(req?.body?.authenticatedUser?.id)
    ) {
      return true;
    }

    return false;
  }
}
