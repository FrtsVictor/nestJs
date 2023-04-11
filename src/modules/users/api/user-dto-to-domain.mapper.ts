import { Builder } from '@app-commons-api/builder';
import { User } from '../domain/model/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export class UserDtoToDomainMapper {
  static createUserDtoToDomain({
    email,
    name,
    password,
    roles,
  }: CreateUserDto) {
    const rolesToSave = roles
      ? roles.map((it) => ({ id: it, name: 'none' }))
      : [];

    return Builder<User>()
      .email(email)
      .name(name)
      .password(password)
      .roles(rolesToSave)
      .build();
  }

  static updateUserDtoToDomain({ email, name, password }: UpdateUserDto) {
    return Builder<User>().email(email).name(name).password(password).build();
  }
}
