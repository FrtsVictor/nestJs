import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UniqueEmailValidator } from './validator/UniqueEmail.validator';
import { ConfigurationModule } from '@app-core/config/configuration.module';
import { userProviders } from './user.provider';
import { TypeormModule } from '@app-modules/typeorm/typeorm.module';
import { IUserRepository } from '../domain/user-repository.interface';

@Module({
  imports: [ConfigurationModule, TypeormModule],
  controllers: [UserController],
  providers: [...userProviders, UniqueEmailValidator],
  exports: [IUserRepository],
})
export class UserModule {}
