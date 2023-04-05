import { Prisma, Role } from '@prisma/client';

export abstract class IRoleRepository {
  abstract create(createRoleDto: Prisma.RoleCreateInput): Promise<Role>;

  abstract findAll(): Promise<Role[]>;

  abstract findOne(id: number): Promise<Role>;

  abstract update(
    id: number,
    updateUser: Prisma.RoleUpdateInput,
  ): Promise<void>;

  abstract remove(id: number): Promise<void>;
}
