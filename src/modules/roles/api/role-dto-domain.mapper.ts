import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from '../domain/role';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRoleDto } from './dto/get-role.dto';
import { Builder } from '@app-commons/api/builder';

export class RoleDtoDomainMapper {
  static updateUserDtoToDomain({ name }: UpdateRoleDto) {
    return Builder<Role>().name(name).build();
  }

  static createRoleDtoToDomain({ name }: CreateRoleDto) {
    return Builder<Role>().name(name).build();
  }

  static domainToGetRoleDto({ id, name }: Role) {
    return Builder<GetRoleDto>().id(id).name(name).build();
  }

  static domainsToGetRoleDtoList(roles: Role[]) {
    return roles.map(this.domainToGetRoleDto);
  }
}
