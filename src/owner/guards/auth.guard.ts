import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Inject } from '@nestjs/common';
import { OwnerAuthService } from '../services/owner-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(OwnerAuthService)
    private ownerAuthService: OwnerAuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    console.log(req?.body?.authenticatedUser);
    if (
      await this.ownerAuthService.checkRole(req?.body?.authenticatedUser?.id)
    ) {
      return true;
    }

    return false;
  }
}
