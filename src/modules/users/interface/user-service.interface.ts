import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserDto } from '../dto/get-user.dto';
import { UpdateUserDto } from '../dto/UpdateUser.dto';

export abstract class IUserService {
  abstract create(createUserDto: CreateUserDto): Promise<number>;
  abstract findAll(): Promise<GetUserDto[]>;
  abstract findOne(id: number): Promise<GetUserDto>;
  abstract findByEmail(email: string): Promise<GetUserDto | null>;
  abstract remove(id: number): Promise<void>;
  abstract update(id: number, updateUserDto: UpdateUserDto): Promise<void>;
}
