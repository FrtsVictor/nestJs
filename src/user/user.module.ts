import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'src/config/configuration.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UniqueEmailValidator } from './validator/UniqueEmail.validator';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UniqueEmailValidator, UserService],
  imports: [ConfigurationModule],
})
export class UserModule {}
