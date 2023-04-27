import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { type } from 'os';
import path from 'path';

@Catch(BadRequestException)
export class FileFilter<T> implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const file = request?.file;

    if (request?.file) {
      if (request?.file?.path) {
        fs.unlink(file.path, (err) => {
          if (err) {
            return err;
          }
        });
      }
    }
    response.status(status).json({
      status: false,
      path: request.url,
      message: 'Provided data is invalid!',
    });
  }
}
