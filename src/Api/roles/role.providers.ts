import { Provider } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RoleRepository } from '@app-infra/users/role.repository';
import { RoleService } from './role.service';
import { IRoleRepository } from '@app-domain/roles/role-repository.interface';
import { IRoleService } from '@app-domain/roles/role-service.interface';

export const roleProviders: Provider<any>[] = [
  {
    provide: IRoleRepository,
    useFactory: (prismaService: PrismaService) =>
      new RoleRepository(prismaService),
    inject: [PrismaService],
  },
  {
    provide: IRoleService,
    useFactory: (roleRepositoryContract: IRoleRepository) =>
      new RoleService(roleRepositoryContract),
    inject: [IRoleRepository],
  },
];
