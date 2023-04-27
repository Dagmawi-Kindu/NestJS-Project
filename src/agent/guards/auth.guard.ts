import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Inject } from '@nestjs/common';
import { AgentAuthService } from '../services/agent-auth/agent-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AgentAuthService)
    private agentAuthService: AgentAuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    console.log(req?.body?.authenticatedUser);
    if (
      await this.agentAuthService.checkRole(req?.body?.authenticatedUser?.id)
    ) {
      return true;
    }

    return false;
  }
}
