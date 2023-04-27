import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
@Injectable()
export class AddOwnerPropertyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const body = context.switchToHttp().getRequest().body;

    function convertTo24HourFormat(time12: string) {
      let [time, period] = time12.split(' ');
      let [hours, minutes] = time.split(':');

      if (period === 'PM' && hours !== '12') {
        hours = String(Number(hours) + 12);
      }

      if (period === 'AM' && hours === '12') {
        hours = '00';
      }

      return `${hours}:${minutes}`;
    }

    if (body?.totalNoOfRooms) {
      body.totalNoOfRooms = parseInt(body.totalNoOfRooms);
    }
    if (body?.singleSized) {
      body.singleSized = parseInt(body.singleSized);
    }
    if (body?.kingSized) {
      body.kingSized = parseInt(body.kingSized);
    }
    if (body?.doubleSized) {
      body.doubleSized = parseInt(body.doubleSized);
    }
    if (body?.deluxeSized) {
      body.deluxeSized = parseInt(body.deluxeSized);
    }
    if (body?.checkIn) {
      const time = convertTo24HourFormat(body?.checkIn);
      body.checkIn = time;
      // console.log(body.checkIn);
    }
    if (body?.checkOut) {
      const time = convertTo24HourFormat(body?.checkOut);
      body.checkOut = time;
    }

    return next.handle();
  }
}
