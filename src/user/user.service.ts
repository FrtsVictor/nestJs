import { PrismaService } from 'src/database/prisma.service';
import { AbstractUserService } from './abstract-user-service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';

export class UserService implements AbstractUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const data = UserMapper.mapPrismaCreate(createUserDto);
    return (await this.prisma.user.create({ data })).id;
  }

  async getById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return UserMapper.mapPrismaUserToGetUserResponse(user);
  }

  async getAll() {
    return UserMapper.mapUserEntityListToListUserDto(
      await this.prisma.user.findMany(),
    );
  }

  async getByEmail(email: string) {
    const user = this.prisma.user.findFirstOrThrow({ where: { email } });
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
