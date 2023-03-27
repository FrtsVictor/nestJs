import { Provider } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';
import { IUserRepository } from './user-repository.interface';
import { IUserService } from './user-service.interface';

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
