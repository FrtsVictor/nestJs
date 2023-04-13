import { Builder } from '@app-commons/api/builder';
import { Role } from '../domain/role';
import { RoleEntity } from './model/role.entity';

export class RoleDomainEntityMapper {
  static domainToEntity({ name, id }: Role) {
    return Builder<RoleEntity>().name(name).id(id).build();
  }
}
