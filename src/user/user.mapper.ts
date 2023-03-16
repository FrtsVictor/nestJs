import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/CreateUser.dto';
import { ListUserDto as GetUserDto } from './dto/ListUser.dto';
import { UserEntity } from './user.entity';

export class UserMapper {
  static mapCreateUserDtoToEntity(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;
    const entity = new UserEntity();
    entity.email = email;
    entity.name = name;
    entity.password = password;
    entity.id = randomUUID();

    return entity;
  }

  static mapUserEntityListToListUserDto(users: UserEntity[]) {
    return users.map((it) => this.mapUserEntityToGetUserDto(it));
  }

  static mapUserEntityToGetUserDto(user: UserEntity) {
    return new GetUserDto(user.name, user.email);
  }
}
