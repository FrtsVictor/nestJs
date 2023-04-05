import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { AuthenticatedUser } from '@app-modules/auth/domain/authenticated-user';

type NewType = AuthenticatedUser;

@Injectable()
export class UserMapper {
  static mapPrismaCreate(createUserDto: CreateUserDto): Prisma.UserCreateInput {
    const { email, name, password, roles } = createUserDto;
    const userCreateInput = {
      name,
      email,
      password,
    };

    if (roles) {
      const rolesCreateMany = roles.map((it) => ({ role_id: it }));
      userCreateInput['roles'] = { createMany: { data: rolesCreateMany } };
    }

    return userCreateInput;
  }

  static mapPrismaUserToGetUserResponse(user: User | never): GetUserDto {
    return this.mapUserEntityToGetUserDto(user);
  }

  static mapPrismaUserToAuthenticatedUser(user: User | never): NewType {
    return new AuthenticatedUser(user.email, user.id);
  }

  static mapUpdateUserDtoToPrismaUpdateUser(
    updateUserDto: UpdateUserDto,
  ): Prisma.UserUpdateInput {
    return updateUserDto;
  }

  static mapUserEntityListGetUserDto(users: User[]): GetUserDto[] {
    return users.map((it) => this.mapUserEntityToGetUserDto(it));
  }

  static mapUserEntityToGetUserDto(user: User): GetUserDto {
    const { email, name, password, id } = user;
    return new GetUserDto(name, email, password, id);
  }
}
