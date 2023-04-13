import { Provider } from '@nestjs/common';
import { RoleService } from '../domain/role.service';
import { IRoleRepository } from '../domain/role-repository.interface';
import { IRoleService } from '../domain/role-service.interface';
import { DataSource } from 'typeorm';
import { TypeormRoleRepository } from '../database/typeorm-role.repository';
import { RoleEntity } from '../database/model/role.entity';
import { TYPEORM_DATA_SOURCE } from '@app-modules/database/typeorm-providers';

export const roleProviders: Provider<any>[] = [
  {
    provide: IRoleRepository,
    useFactory: (dataSource: DataSource) =>
      new TypeormRoleRepository(dataSource.getRepository(RoleEntity)),
    inject: [TYPEORM_DATA_SOURCE],
  },
  {
    provide: IRoleService,
    useFactory: (roleRepository: IRoleRepository) =>
      new RoleService(roleRepository),
    inject: [IRoleRepository],
  },
];
