import { Provider } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { RoleRepository } from '../infra/role.repository';
import { RoleService } from '../domain/role.service';
import { IRoleRepository } from '../domain/role-repository.interface';
import { IRoleService } from '../domain/role-service.interface';

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
