import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'src/config/configuration.module';
import { PrismaModule } from 'src/database/prisma.module';
import { AbstractUserService } from './abstract-user-service';
import { PrismaUserService } from './prisma-user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { userServiceProviders } from './user.service.provider';
import { UniqueEmailValidator } from './validator/UniqueEmail.validator';

@Module({
  imports: [ConfigurationModule, PrismaModule],

  controllers: [UserController],

  providers: [
    PrismaUserService,
    UserRepository,
    UniqueEmailValidator,
    { ...userServiceProviders },
  ],

  exports: [AbstractUserService, PrismaUserService],
})
export class UserModule {}
