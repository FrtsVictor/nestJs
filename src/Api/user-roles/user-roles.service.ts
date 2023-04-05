import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IUserRolesRepository } from '@app-domain/user-roles/user-role.repository.interface.';
import { CreateUserRoleRequestDto } from './dto/create-user-role.dto';
import { IUserRolesService } from '@app-domain/user-roles/user-service.interface';
import { GetUserRolesResponseDto } from './dto/get-user-role-response.dto';

export class UserRolesService implements IUserRolesService {
  constructor(private readonly userRepository: IUserRolesRepository) {}

  findAll(id: number): Promise<GetUserRolesResponseDto> {
    throw new Error('Method not implemented.');
  }

  async grantUserRole({
    userId,
    roleId,
    roleIds,
  }: CreateUserRoleRequestDto): Promise<void | NotFoundException> {
    this.validatePayload({ userId, roleId });

    roleId
      ? await this.userRepository.grantUserRole({ roleId, userId })
      : await this.userRepository.grantUserRoles({ userId, roleIds });
  }

  async revokeUserRole({
    userId,
    roleId,
    roleIds,
  }: CreateUserRoleRequestDto): Promise<void | NotFoundException> {
    this.validatePayload({ userId, roleId });

    roleId
      ? await this.revokeUserRole({ userId, roleId })
      : await this.userRepository.revokeUserRoles({ userId, roleIds });
  }

  private validatePayload({
    roleId,
    roleIds,
    userId,
  }: CreateUserRoleRequestDto) {
    if ((!roleId && !roleIds) || !userId) {
      throw new BadRequestException('Invalid roleId or userId');
    }
  }
}
