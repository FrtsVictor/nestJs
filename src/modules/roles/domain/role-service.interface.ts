import { CreateRoleDto } from '../api/dto/create-role.dto';
import { GetRoleDto } from '../api/dto/get-role.dto';
import { UpdateRoleDto } from '../api/dto/update-role.dto';

export abstract class IRoleService {
  abstract create(createRoleDto: CreateRoleDto): Promise<number>;
  abstract findAll(): Promise<GetRoleDto[]>;
  abstract findOne(id: number): Promise<GetRoleDto>;
  abstract update(id: number, updateRoleDto: UpdateRoleDto): Promise<void>;
  abstract remove(id: number): Promise<void>;
}
