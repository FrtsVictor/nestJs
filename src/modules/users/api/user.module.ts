import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UniqueEmailValidator } from './validator/UniqueEmail.validator';
import { ConfigurationModule } from '@app-commons-api/config/configuration.module';
import { userProviders } from './user.provider';
import { TypeormModule } from '@app-modules/typeorm/typeorm.module';
import { IUserService } from '../domain/users-service.interface';

@Module({
  imports: [ConfigurationModule, TypeormModule],
  controllers: [UserController],
  providers: [...userProviders, UniqueEmailValidator],
  exports: [IUserService],
})
export class UserModule {}
