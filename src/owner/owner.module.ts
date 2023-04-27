import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentModule } from 'src/agent/agent.module';
import { OwnerAuthController } from './controllers/owner-auth.controller';
import { OwnerAuth } from './entities/OwnerAuth.entity';
import { TempOwnerAuth } from './entities/TempOwnerAuth.entity';
import { OwnerAuthService } from './services/owner-auth.service';
import { TokenValidationMiddleware } from 'src/middlewares/tokenValidation.middleware';
import { OwnerProperty } from './entities/OwnerProperty.entity';
import { OwnerPropertyController } from './controllers/owner-property.controller';
import { OwnerPropertyService } from './services/owner-property.service';
import { PropertyRooms } from './entities/PropRoom.entity';
import { PropertyRoomsController } from './controllers/property-room.controller';
import { PropertyRoomService } from './services/property-room.service';

@Module({
  imports: [
    MulterModule.register({}),
    TypeOrmModule.forFeature([
      OwnerAuth,
      TempOwnerAuth,
      OwnerProperty,
      PropertyRooms,
    ]),
    AgentModule,
  ],
  controllers: [
    OwnerAuthController,
    OwnerPropertyController,
    PropertyRoomsController,
  ],
  providers: [OwnerAuthService, OwnerPropertyService, PropertyRoomService],
})
export class OwnerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenValidationMiddleware)
      .forRoutes(OwnerPropertyController);
  }
}
