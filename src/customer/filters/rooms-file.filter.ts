import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';

import { Request, Response } from 'express';
import * as fs from 'fs';

@Catch(BadRequestException)
export class RoomsFileFilter<T> implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();

    const files = request?.files;

    let x: string[] = [];

    const myFilesWithPrototype = Object.create(Object.prototype);
    Object.assign(myFilesWithPrototype, files);

    myFilesWithPrototype?.main_image_i.map((e) => {
      x.push(e.path);
    });
    myFilesWithPrototype?.main_image_ii.map((e) => {
      x.push(e.path);
    });
    myFilesWithPrototype?.main_image_iii.map((e) => {
      x.push(e.path);
    });
    myFilesWithPrototype?.bath_image_i.map((e) => {
      x.push(e.path);
    });
    myFilesWithPrototype?.bath_image_ii.map((e) => {
      x.push(e.path);
    });
    myFilesWithPrototype?.others_image_i.map((e) => {
      x.push(e.path);
    });
    myFilesWithPrototype?.others_image_ii.map((e) => {
      x.push(e.path);
    });

    for (let element of x) {
      fs.unlink(element, (err) => {
        if (err) {
          return err;
        }
      });
    }

    response.status(status).json({
      status: false,
      path: request.url,
      message: 'Provided data is invalid!',
    });
  }
}
