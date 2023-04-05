import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IRoleRepository } from '@app-domain/roles/role-repository.interface';
import { RoleMapper } from './role.mapper';
import { IRoleService } from '@app-domain/roles/role-service.interface';

export class RoleService implements IRoleService {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async create(createRoleDto: CreateRoleDto) {
    const data = RoleMapper.mapCreateUserDtoToPrismaEntity(createRoleDto);
    return (await this.roleRepository.create(data)).id;
  }

  async findAll() {
    const data = this.roleRepository.findAll();
    return RoleMapper.mapPrismaRolesToGetRoleDto(await data);
  }

  async findOne(id: number) {
    return RoleMapper.mapPrimaRoleToGetRoleDto(
      await this.roleRepository.findOne(id),
    );
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }

  async remove(id: number) {
    return this.roleRepository.remove(id);
  }
}
