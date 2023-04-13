import { CreateRoleRequestDto } from './dto/create-role-request.dto';
import { Role } from '../domain/role';
import { UpdateRoleRequestDto } from './dto/update-role-request.dto';
import { RoleResponseDto } from './dto/role-response.dto';
import { Builder } from '@app-commons/api/builder';
import { RoleEntity } from '../database/role.entity';

export class RolesMapper {
  static updateUserDtoToDomain({ name }: UpdateRoleRequestDto) {
    return Builder<Role>().name(name).build();
  }

  static createRoleDtoToDomain({ name }: CreateRoleRequestDto) {
    return Builder<Role>().name(name).build();
  }

  static domainToGetRoleDto({ id, name }: Role) {
    return Builder<RoleResponseDto>().id(id).name(name).build();
  }

  static domainsToGetRoleDtoList(roles: Role[]) {
    return roles.map(this.domainToGetRoleDto);
  }

  static domainToEntity({ name, id }: Role) {
    return Builder<RoleEntity>().name(name).id(id).build();
  }
}
