import { CacheModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentAuth } from 'src/agent/entities/AgentAuth.entity';
import { TempAgentAuth } from 'src/agent/entities/TempAgentAuth.entity';
import { AgentAuthController } from './controllers/agent-auth/agent-auth.controller';
import { AgentAuthService } from './services/agent-auth/agent-auth.service';

@Module({
  imports: [
    MulterModule.register(),
    // CacheModule.register({
    //   isGlobal: true,
    // }),
    TypeOrmModule.forFeature([AgentAuth, TempAgentAuth]),
  ],
  controllers: [AgentAuthController],
  providers: [AgentAuthService],
  exports: [AgentAuthService],
})
export class AgentModule {}
