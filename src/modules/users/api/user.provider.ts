import { Provider } from '@nestjs/common';
import { UserService } from './users.service';
import { IUserRepository } from '../domain/user-repository.interface';
import { IUserService } from '../domain/user-service.interface';
import { DataSource } from 'typeorm';
import { TYPEORM_DATA_SOURCE } from '@app-modules/database/typeorm-providers';
import { UserEntity } from '../database/user.entity';
import { UniqueEmailValidator } from './validator/unique-email.validator';
import { TypeormUserRepository } from '../database/typeorm-user.repository';

export const userProviders: Provider<any>[] = [
  {
    provide: IUserRepository,
    useFactory: async (dataSource: DataSource) =>
      new TypeormUserRepository(dataSource.getRepository(UserEntity)),
    inject: [TYPEORM_DATA_SOURCE],
  },
  {
    provide: UniqueEmailValidator,
    useFactory: async (userRepository: IUserRepository) =>
      new UniqueEmailValidator(userRepository),
    inject: [IUserRepository],
  },
  {
    provide: IUserService,
    useFactory: (userRepository: IUserRepository) =>
      new UserService(userRepository),
    inject: [IUserRepository],
  },
];
