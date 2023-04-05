import { Provider } from '@nestjs/common';
import { IUserRolesRepository } from '../domain/user-role.repository.interface.';
import { UserRoleRepository } from '../infra/user-role.repository';
import { PrismaService } from 'src/database/prisma.service';
import { UserRolesService } from '../domain/user-roles.service';
import { IUserRolesService } from '../domain/user-service.interface';

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
