import { UpdateUserDto } from '../api/dto/UpdateUser.dto';
import { CreateUserDto } from '../api/dto/create-user.dto';
import { GetUserDto } from '../api/dto/get-user.dto';

export abstract class IUserService {
  abstract create(createUserDto: CreateUserDto): Promise<number>;
  abstract findAll(): Promise<GetUserDto[]>;
  abstract findOne(id: number): Promise<GetUserDto>;
  abstract findByEmail(email: string): Promise<{
    id: number;
    email: string;
    name: string;
    password: string;
    roles: {
      id: number;
      assignedAt: Date;
    }[];
  }>;
  abstract remove(id: number): Promise<void>;
  abstract update(id: number, updateUserDto: UpdateUserDto): Promise<void>;
}
