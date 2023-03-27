import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { AuthenticatedUser } from '../auth/dto/authenticated-user';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserMapper {
  static mapPrismaCreate(createUserDto: CreateUserDto): Prisma.UserCreateInput {
    const { email, name, password } = createUserDto;
    return {
      name,
      email,
      password,
    };
  }

  static mapPrismaUserToGetUserResponse(user: User | never) {
    return this.mapUserEntityToGetUserDto(user);
  }

  static mapPrismaUserToAuthenticatedUser(user: User | never) {
    return new AuthenticatedUser(user.name, user.email, user.id);
  }

  static mapCreateUserDtoToEntity(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;
    const entity = new UserEntity();
    entity.email = email;
    entity.name = name;
    entity.password = password;
    entity.id = randomUUID();

    return entity;
  }

  static mapUpdateUserDtoToPrismaUpdateUser(
    updateUserDto: UpdateUserDto,
  ): Prisma.UserUpdateInput {
    return updateUserDto;
  }

  static mapUserEntityListGetUserDto(users: User[]) {
    return users.map((it) => this.mapUserEntityToGetUserDto(it));
  }

  static mapUserEntityToGetUserDto(user: User) {
    const { email, name, password, id } = user;
    return new GetUserDto(name, email, password, id);
  }
}
