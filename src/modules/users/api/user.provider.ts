import { Provider } from '@nestjs/common';
import { UserService } from '../domain/users.service';
import { IUserRepository } from '../domain/users-repository.interface';
import { IUserService } from '../domain/users-service.interface';
import { DataSource } from 'typeorm';
import { TYPEORM_DATA_SOURCE } from '@app-modules/database/typeorm-providers';
import { UserEntity } from '../infra/model/user.entity';
import { UniqueEmailValidator } from './validator/UniqueEmail.validator';
import { TypeormUserRepository } from '../infra/typeorm-user.repository';

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
