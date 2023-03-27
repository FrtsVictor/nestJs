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

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
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
