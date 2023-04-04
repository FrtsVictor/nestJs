import { NotFoundException } from '@nestjs/common';
import { IUserRolesRepository } from './interfaces/user-role.repository.interface.';
import { PrismaService } from '../../database/prisma.service';

export class UserRoleRepository implements IUserRolesRepository {
  #prismaUserRole = this.prismaService.user_Roles;

  constructor(private prismaService: PrismaService) {}

  async grantUserRole({
    userId,
    roleId,
  }: {
    userId: number;
    roleId: number;
  }): Promise<void | NotFoundException> {
    const data = { user_id: userId, role_id: roleId };

    await this.#prismaUserRole.create({
      data,
    });
  }

  async grantUserRoles({
    userId,
    roleIds,
  }: {
    userId: number;
    roleIds: number[];
  }): Promise<void | NotFoundException> {
    const data = roleIds.map((it) => ({ role_id: it, user_id: userId }));

    await this.#prismaUserRole.createMany({
      data,
    });
  }

  async revokeUserRole({
    userId,
    roleId,
  }: {
    userId: number;
    roleId: number;
  }): Promise<void | NotFoundException> {
    try {
      await this.prismaService.user_Roles.delete({
        where: { role_id_user_id: { role_id: roleId, user_id: userId } },
      });
    } catch (error) {
      console.warn(error);
    }
  }

  async revokeUserRoles({
    userId,
    roleIds,
  }: {
    userId: number;
    roleIds: number[];
  }): Promise<void | NotFoundException> {
    try {
      await this.prismaService.user_Roles.deleteMany({
        where: { user_id: userId, AND: { role_id: { in: roleIds } } },
      });
    } catch (error) {
      console.warn(error);
    }
  }
}
