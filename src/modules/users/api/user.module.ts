import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UniqueEmailValidator } from './validator/UniqueEmail.validator';
import { userProviders } from './user.provider';
import { IUserService } from '../domain/users-service.interface';
import { TypeormModule } from '@app-modules/database/typeorm.module';
import { AppConfigurationModule } from '@app-commons/api/config/configuration.module';

@Module({
  imports: [AppConfigurationModule, TypeormModule],
  controllers: [UserController],
  providers: [...userProviders, UniqueEmailValidator],
  exports: [IUserService],
})
export class UserModule {}
