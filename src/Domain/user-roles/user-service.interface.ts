import { NotFoundException } from '@nestjs/common';
import { CreateUserRoleRequestDto } from '@app-api/user-roles/dto/create-user-role.dto';
import { GetUserRolesResponseDto } from '@app-api/user-roles/dto/get-user-role-response.dto';

export abstract class IUserRolesService {
  abstract grantUserRole(
    data: CreateUserRoleRequestDto,
  ): Promise<void | NotFoundException>;
  abstract revokeUserRole(
    data: CreateUserRoleRequestDto,
  ): Promise<void | NotFoundException>;
  abstract findAll(id: number): Promise<GetUserRolesResponseDto>;
}
