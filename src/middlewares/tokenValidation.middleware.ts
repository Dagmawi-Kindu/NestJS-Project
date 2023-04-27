import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let { authorization } = req.headers;
    if (!authorization)
      throw new HttpException('No authorization token', HttpStatus.FORBIDDEN);
    const token = authorization?.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        throw new HttpException('Invalid Token!', HttpStatus.BAD_REQUEST);
      }
      req.body.authenticatedUser = user;
    });

    next();
  }
}
