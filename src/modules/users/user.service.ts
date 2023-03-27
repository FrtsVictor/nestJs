import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { IUserRepository } from './interface/user-repository.interface';
import { IUserService } from './interface/user-service.interface';
import { UserMapper } from './user.mapper';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(createUserDto: CreateUserDto) {
    let data = UserMapper.mapPrismaCreate(createUserDto);

    if (createUserDto.roles) {
      const roles = createUserDto.roles.map((it) => ({ role_id: it }));
      data = { ...data, roles: { createMany: { data: roles } } };
    }

    return (await this.userRepository.create(data)).id;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    return UserMapper.mapPrismaUserToGetUserResponse(user);
  }

  async findAll() {
    return UserMapper.mapUserEntityListGetUserDto(
      await this.userRepository.findAll(),
    );
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      return UserMapper.mapPrismaUserToGetUserResponse(user);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = UserMapper.mapUpdateUserDtoToPrismaUpdateUser(updateUserDto);
    this.userRepository.update(id, data);
  }

  async remove(id: number) {
    this.userRepository.remove(id);
  }
}
