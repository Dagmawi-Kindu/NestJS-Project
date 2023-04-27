import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { isDate } from 'date-fns';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class SignupInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest() as Request;

    if (isDate(new Date(req.body?.dob))) {
      req.body.dob = new Date(req.body.dob);
    }

    return next.handle();
  }
}
