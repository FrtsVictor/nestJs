import { Builder } from '@app-commons/api/builder';
import { User } from '../domain/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../database/user.entity';
import { RoleEntity } from '@app-modules/roles/database/role.entity';

export class UserMapper {
  static createDtoToDomain(createDto: CreateUserDto) {
    const rolesToSave = createDto.roles
      ? createDto.roles.map((it) => ({ id: it, name: 'none' }))
      : [];

    return User.create({
      email: createDto.email,
      name: createDto.name,
      password: createDto.password,
      roles: rolesToSave,
    });
  }

  static updateDtoToDomain({ email, name, password }: UpdateUserDto) {
    return User.create({ email, name, password });
  }

  static domainToEntity(user: User): UserEntity {
    return Builder<UserEntity>()
      .email(user.email)
      .name(user.name)
      .password(user.password)
      .roles(user.roles as RoleEntity[])
      .createdAt(user.createdAt)
      .updatedAt(user.updatedAt)
      .id(user.id)
      .build();
  }

  static entitiesToDomain(users: UserEntity[]): User[] {
    return users.map(this.entityToDomain);
  }

  static entityToDomain(entity: UserEntity): User {
    return User.create({
      createdAt: entity.createdAt,
      email: entity.email,
      id: entity.id,
      name: entity.name,
      password: entity.password,
      roles: entity.roles,
      updatedAt: entity.updatedAt,
    });
  }
}
