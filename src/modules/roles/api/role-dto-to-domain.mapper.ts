import { Builder } from '@app-modules/commons/api/builder';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from '../domain/role';
import { UpdateRoleDto } from './dto/update-role.dto';

export class RoleDtoDomainMapper {
  static updateUserDtoToDomain({ name }: UpdateRoleDto) {
    return Builder<Role>().name(name).build();
  }

  static createRoleDtoToDomain({ name }: CreateRoleDto) {
    return Builder<Role>().name(name).build();
  }
}
