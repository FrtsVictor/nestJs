import { NotFoundException } from '@nestjs/common';
import { UserRoleRequest } from '../dto/user-role.dto';
import { UserRolesResponse } from '../dto/user-role.response';

export abstract class IUserRolesService {
  abstract grantUserRole(
    data: UserRoleRequest,
  ): Promise<void | NotFoundException>;
  abstract revokeUserRole(
    data: UserRoleRequest,
  ): Promise<void | NotFoundException>;
  abstract findAll(id: number): Promise<UserRolesResponse>;
}
