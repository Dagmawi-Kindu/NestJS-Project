import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';

import { Request, Response } from 'express';
import * as fs from 'fs';

@Catch(BadRequestException)
export class PropertyFileFilter<T> implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();

    const files = request?.files;

    let x: string[] = [];

    const myFilesWithPrototype = Object.create(Object.prototype);
    Object.assign(myFilesWithPrototype, files);

    myFilesWithPrototype?.building_front.map((e) => {
      x.push(e.path);
    });
    myFilesWithPrototype?.building_side.map((e) => {
      x.push(e.path);
    });
    myFilesWithPrototype?.reception_image_first.map((e) => {
      x.push(e.path);
    });
    myFilesWithPrototype?.reception_image_second.map((e) => {
      x.push(e.path);
    });

    for (let element of x) {
      fs.unlink(element, (err) => {
        if (err) {
          return err;
        }
      });
    }

    // if (request?.file) {
    //   if (request?.file?.path) {
    //     fs.unlink(file.path, (err) => {
    //       if (err) {
    //         return err;
    //       }
    //     });
    //   }
    // }
    response.status(status).json({
      status: false,
      path: request.url,
      message: 'Provided data is invalid!',
    });
  }
}
