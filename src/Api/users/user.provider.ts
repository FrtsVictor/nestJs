import { Provider } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { IUserRepository } from '@app-domain/users/user-repository.interface';
import { IUserService } from '@app-domain/users/user-service.interface';
import { UserRepository } from '@app-infra/users/user.repository';
import { UserService } from './user.service';

export const userProviders: Provider<any>[] = [
  {
    provide: IUserRepository,
    useFactory: (prismaService: PrismaService) =>
      new UserRepository(prismaService),
    inject: [PrismaService],
  },
  {
    provide: IUserService,
    useFactory: (userRepository: IUserRepository) =>
      new UserService(userRepository),
    inject: [IUserRepository],
  },
];
