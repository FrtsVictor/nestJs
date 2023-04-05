import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../core/config/configuration.module';
import { PrismaModule } from '../../database/prisma.module';
import { userProviders } from './user.provider';
import { UserController } from './user.controller';
import { UniqueEmailValidator } from './validator/unique-email.validator';
import { IUserService } from '@app-domain/users/user-service.interface';

@Module({
  imports: [ConfigurationModule, PrismaModule],
  controllers: [UserController],
  providers: [UniqueEmailValidator, ...userProviders],
  exports: [IUserService],
})
export class UserModule {}
