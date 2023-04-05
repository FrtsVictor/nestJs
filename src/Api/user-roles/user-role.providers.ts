import { Provider } from '@nestjs/common';
import { IUserRolesRepository } from '@app-domain/user-roles/user-role.repository.interface.';
import { UserRoleRepository } from '@app-infra/user-roles/user-role.repository';
import { PrismaService } from '../../database/prisma.service';
import { UserRolesService } from './user-roles.service';
import { IUserRolesService } from '@app-domain/user-roles/user-service.interface';

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
