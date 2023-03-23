import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data = UserMapper.mapPrismaCreate(createUserDto);
    return (await this.prisma.user.create({ data })).id;
  }

  async getById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return UserMapper.mapPrismaUserToGetUserResponse(user);
  }

  async getAll() {
    return UserMapper.mapUserEntityListGetUserDto(
      await this.prisma.user.findMany(),
    );
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { email } });
    return UserMapper.mapPrismaUserToGetUserResponse(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = UserMapper.mapUpdateUserDtoToPrismaUpdateUser(updateUserDto);
    this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: number) {
    this.prisma.user.delete({ where: { id } });
  }
}
