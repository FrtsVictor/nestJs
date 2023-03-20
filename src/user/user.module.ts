import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'src/config/configuration.module';
import { AbstractUserService } from './abstract-user-service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { userServiceProviders } from './user.service.provider';
import { UniqueEmailValidator } from './validator/UniqueEmail.validator';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    UniqueEmailValidator,
    { ...userServiceProviders },
  ],
  imports: [ConfigurationModule],
  exports: [AbstractUserService],
})
export class UserModule {}
