import { Builder } from '@app-modules/commons/api/builder';
import { User } from '../domain/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export class UserDtoToDomainMapper {
  static createUserDtoToDomain({
    email,
    name,
    password,
    roles,
  }: CreateUserDto) {
    return Builder<User>()
      .email(email)
      .name(name)
      .password(password)
      .roles(roles)
      .build();
  }

  static updateUserDtoToDomain({ email, name, password }: UpdateUserDto) {
    return Builder<User>().email(email).name(name).password(password).build();
  }
}
