import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IUserRolesRepository } from './interfaces/user-role.repository.interface.';
import { IUserRolesService } from './interfaces/user-service.interface';
import { UserRoleRequest } from './dto/user-role.dto';
import { UserRolesResponse } from './dto/user-role.response';

export class UserRolesService implements IUserRolesService {
  constructor(private readonly userRepository: IUserRolesRepository) {}

  findAll(id: number): Promise<UserRolesResponse> {
    throw new Error('Method not implemented.');
  }

  async grantUserRole({
    userId,
    roleId,
    roleIds,
  }: UserRoleRequest): Promise<void | NotFoundException> {
    this.validatePayload({ userId, roleId });

    roleId
      ? await this.userRepository.grantUserRole({ roleId, userId })
      : await this.userRepository.grantUserRoles({ userId, roleIds });
  }

  async revokeUserRole({
    userId,
    roleId,
    roleIds,
  }: UserRoleRequest): Promise<void | NotFoundException> {
    this.validatePayload({ userId, roleId });

    roleId
      ? await this.revokeUserRole({ userId, roleId })
      : await this.userRepository.revokeUserRoles({ userId, roleIds });
  }

  private validatePayload({ roleId, roleIds, userId }: UserRoleRequest) {
    if ((!roleId && !roleIds) || !userId) {
      throw new BadRequestException('Invalid roleId or userId');
    }
  }
}
