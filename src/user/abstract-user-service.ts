import { CreateUserDto } from './dto/CreateUser.dto';
import { ListUserDto } from './dto/ListUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserEntity } from './user.entity';

export abstract class AbstractUserService {
  abstract getById(id: string): Promise<UserEntity>;

  abstract getAll(): Promise<ListUserDto[]>;

  abstract getByEmail(email: string): Promise<UserEntity>;

  abstract create(request: CreateUserDto): Promise<UserEntity>;

  abstract update(id: string, updateUserDto: UpdateUserDto): Promise<void>;

  abstract deleteById(id: string): Promise<void>;
}
