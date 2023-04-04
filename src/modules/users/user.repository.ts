import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { IUserRepository } from './interface/user-repository.interface';

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(param: string) {
    const response = await this.prisma.user.findUnique({
      where: { email: param },
      include: { roles: true },
    });

    if (response) {
      const { email, id, roles, name, password } = response;
      const mappedRoles = roles.map(({ role_id, assignedAt }) => ({
        id: role_id,
        assignedAt,
      }));

      return {
        id,
        email,
        name,
        password,
        roles: mappedRoles,
      };
    }
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
  }
}
