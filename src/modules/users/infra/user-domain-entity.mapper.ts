import { Builder } from '@app-modules/commons/api/builder';
import { User } from '../domain/user.model';
import { UserEntity } from './model/user.entity';
import { RoleEntity } from '@app-modules/roles/infra/model/role.entity';

export class UserDomainEntityMapper {
  static userToEntity({
    email,
    name,
    password,
    roles,
    createdAt,
    updatedAt,
    id,
  }: User): UserEntity {
    return Builder<UserEntity>()
      .email(email)
      .name(name)
      .password(password)
      .roles(roles as RoleEntity[])
      .createdAt(createdAt)
      .updatedAt(updatedAt)
      .id(id)
      .build();
  }

  static userEntitiesToDomain(users: UserEntity[]): User[] {
    return users.map(this.userEntityToDomain);
  }

  static userEntityToDomain({
    createdAt,
    email,
    id,
    name,
    password,
    roles,
    updatedAt,
  }: UserEntity): User {
    return Builder<User>()
      .createdAt(createdAt)
      .email(email)
      .id(id)
      .name(name)
      .password(password)
      .roles(roles)
      .updatedAt(updatedAt)
      .build();
  }
}
