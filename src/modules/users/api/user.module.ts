import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UniqueEmailValidator } from './validator/UniqueEmail.validator';
import { ConfigurationModule } from '@app-core/config/configuration.module';
import { PrismaModule } from 'src/database/prisma.module';
import { userProviders } from './user.provider';
import { IUserService } from '../domain/user-service.interface';

@Module({
  imports: [ConfigurationModule, PrismaModule],
  controllers: [UserController],
  providers: [UniqueEmailValidator, ...userProviders],
  exports: [IUserService],
})
export class UserModule {}
