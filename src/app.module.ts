import { Module } from '@nestjs/common';
import { AgentModule } from './agent/agent.module';
import { OwnerModule } from './owner/owner.module';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAuth } from './customer/entities/CustomerAuth.entity';
import { AgentAuth } from './agent/entities/AgentAuth.entity';
import { TempAgentAuth } from './agent/entities/TempAgentAuth.entity';
import { OwnerAuth } from './owner/entities/OwnerAuth.entity';
import { TempOwnerAuth } from './owner/entities/TempOwnerAuth.entity';
import { OwnerProperty } from './owner/entities/OwnerProperty.entity';
import { PropertyRooms } from './owner/entities/PropRoom.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'projectraf',
      synchronize: true,
      logging: false,
      entities: [
        CustomerAuth,
        AgentAuth,
        TempAgentAuth,
        OwnerAuth,
        TempOwnerAuth,
        OwnerProperty,
        PropertyRooms,
      ],
      migrations: [],
      subscribers: [],
    }),
    CustomerModule,
    AgentModule,
    OwnerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
