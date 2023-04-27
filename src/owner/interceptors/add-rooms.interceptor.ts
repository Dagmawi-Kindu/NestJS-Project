import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AddRoomsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const body = context.switchToHttp().getRequest().body;

    if (body?.price) {
      body.price = parseInt(body.price);
    }
    if (body?.discount) {
      body.discount = parseInt(body.discount);
    }
    if (body?.totalAmount) {
      body.totalAmount = parseInt(body.totalAmount);
    }

    return next.handle();
  }
}
