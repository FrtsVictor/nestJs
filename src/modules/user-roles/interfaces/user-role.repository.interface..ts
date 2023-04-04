import { NotFoundException } from '@nestjs/common';

export abstract class IUserRolesRepository {
  abstract grantUserRole(data: {
    userId: number;
    roleId: number;
  }): Promise<void | NotFoundException>;
  abstract grantUserRoles(data: {
    userId: number;
    roleIds: number[];
  }): Promise<void | NotFoundException>;
  abstract revokeUserRole(data: {
    userId: number;
    roleId: number;
  }): Promise<void | NotFoundException>;
  abstract revokeUserRoles(data: {
    userId: number;
    roleIds: number[];
  }): Promise<void | NotFoundException>;
}
