import { Prisma, Role } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { GetRoleDto } from './dto/get-role.dto';

export class RolePrismaMapper {
  static mapPrismaRolesToGetRoleDto(data: Role[]) {
    return data.map((it) => new GetRoleDto(it.id, it.name));
  }

  static mapCreateUserDtoToPrismaEntity(createRoleDto: CreateRoleDto) {
    return createRoleDto as Prisma.RoleCreateInput;
  }

  static mapPrimaRoleToGetRoleDto(role: Role) {
    return new GetRoleDto(role.id, role.name);
  }
}