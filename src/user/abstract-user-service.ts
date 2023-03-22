import { CreateUserDto } from './dto/CreateUser.dto';
import { ListUserDto } from './dto/ListUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserEntity } from './user.entity';

export abstract class AbstractUserService {
  abstract getById(id: number): Promise<ListUserDto>;

  abstract getAll(): Promise<ListUserDto[]>;

  abstract getByEmail(email: string): Promise<ListUserDto>;

  abstract create(request: CreateUserDto): Promise<number>;

  abstract update(id: number, updateUserDto: UpdateUserDto): Promise<void>;

  abstract deleteById(id: number): Promise<void>;
}
