import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../../core/config/configuration.module';
import { PrismaModule } from '../../database/prisma.module';
import { PrismaUserService } from './prisma-user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UniqueEmailValidator } from './validator/UniqueEmail.validator';

@Module({
  imports: [ConfigurationModule, PrismaModule],

  controllers: [UserController],

  providers: [
    PrismaUserService,
    UserRepository,
    UniqueEmailValidator,
    UserService,
  ],

  exports: [UserService, PrismaUserService],
})
export class UserModule {}
