import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../../core/config/configuration.module';
import { PrismaModule } from '../../database/prisma.module';
import { IUserService } from './interface/user-service.interface';
import { userProviders } from './interface/user.provider';
import { UserController } from './user.controller';
import { UniqueEmailValidator } from './validator/UniqueEmail.validator';

@Module({
  imports: [ConfigurationModule, PrismaModule],

  controllers: [UserController],

  providers: [UniqueEmailValidator, ...userProviders],

  exports: [IUserService],
})
export class UserModule {}
