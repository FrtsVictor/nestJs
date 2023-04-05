import { Provider } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { UserRepository } from '../infra/user.repository';
import { UserService } from '../domain/user.service';
import { IUserRepository } from '../domain/user-repository.interface';
import { IUserService } from '../domain/user-service.interface';

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
