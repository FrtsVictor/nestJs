import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UniqueEmailValidator } from './validator/unique-email.validator';
import { userProviders } from './user.provider';
import { IUserService } from '../domain/user-service.interface';
import { TypeormModule } from '@app-modules/database/typeorm.module';
import { AppConfigurationModule } from '@app-commons/api/config/configuration.module';

@Module({
  imports: [AppConfigurationModule, TypeormModule],
  controllers: [UserController],
  providers: [...userProviders, UniqueEmailValidator],
  exports: [IUserService],
})
export class UserModule {}
