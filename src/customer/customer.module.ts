import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { TokenValidationMiddleware } from 'src/middlewares/tokenValidation.middleware';
import { CustomerAuth } from 'src/customer/entities/CustomerAuth.entity';

import { CustomerAuthController } from './controllers/customer-auth/customer-auth.controller';
import { CustomerAuthService } from './services/customer-auth/customer-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAuth])],
  controllers: [CustomerAuthController],
  providers: [CustomerAuthService],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenValidationMiddleware).forRoutes({
      path: 'customer-auth/tryout',
      method: RequestMethod.GET,
    });
  }
}
