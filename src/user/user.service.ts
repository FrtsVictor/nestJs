import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getById(id: string) {
    return UserMapper.mapCreateUserDtoToEntity(
      await this.userRepository.getById(id),
    );
  }

  async getAll() {
    return UserMapper.mapUserEntityListToListUserDto(
      await this.userRepository.getAll(),
    );
  }

  async getByEmail(email: string) {
    return this.userRepository.getByEmail(email);
  }

  async create(request: CreateUserDto) {
    const entity = UserMapper.mapCreateUserDtoToEntity(request);
    await this.userRepository.save(entity);
    return entity;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
  }

  async deleteById(id: string) {
    return await this.userRepository.delete(id);
  }
}
