import { UpdateUserDto } from '../api/dto/UpdateUser.dto';
import { CreateUserDto } from '../api/dto/create-user.dto';
import { UserMapper } from '../api/user.mapper';
import { IUserRepository } from './user-repository.interface';
import { IUserService } from './user-service.interface';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const data = UserMapper.mapPrismaCreate(createUserDto);
    const savedUser = await this.userRepository.create(data);
    return savedUser.id;
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
    return await this.userRepository.findByEmail(email);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = UserMapper.mapUpdateUserDtoToPrismaUpdateUser(updateUserDto);
    this.userRepository.update(id, data);
  }

  async remove(id: number) {
    this.userRepository.remove(id);
  }
}
