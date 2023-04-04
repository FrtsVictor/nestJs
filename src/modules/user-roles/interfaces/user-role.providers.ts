import { Provider } from '@nestjs/common';
import { IUserRolesRepository } from './user-role.repository.interface.';
import { UserRoleRepository } from '../user-role.repository';
import { PrismaService } from 'src/database/prisma.service';
import { IUserRolesService } from './user-service.interface';
import { UserRolesService } from '../user-roles.service';

export const userRolesProviders: Provider[] = [
  {
    provide: IUserRolesRepository,
    useFactory: (prismaService: PrismaService) =>
      new UserRoleRepository(prismaService),
    inject: [PrismaService],
  },
  {
    provide: IUserRolesService,
    useFactory: (userRepository: IUserRolesRepository) =>
      new UserRolesService(userRepository),
    inject: [IUserRolesRepository],
  },
];
