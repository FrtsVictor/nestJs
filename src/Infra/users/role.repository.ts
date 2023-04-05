import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { IRoleRepository } from '@app-domain/roles/role-repository.interface';

export class RoleRepository implements IRoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.RoleCreateInput) {
    return await this.prismaService.role.create({ data });
  }

  async findAll() {
    return await this.prismaService.role.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.role.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.RoleUpdateInput) {
    await this.prismaService.role.update({ data, where: { id } });
  }

  async remove(id: number) {
    await this.prismaService.role.delete({ where: { id } });
  }
}
