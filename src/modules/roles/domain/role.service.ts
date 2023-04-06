import { IRoleRepository } from './role-repository.interface';
import { IRoleService } from './role-service.interface';
import { Role } from './role';

export class RoleService implements IRoleService {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async create(role: Role) {
    return await this.roleRepository.create(role);
  }

  async findAll() {
    return await this.roleRepository.findAll();
  }

  async findOne(id: number) {
    return await this.roleRepository.findOne(id);
  }

  async update(id: number, roleToUpdate: Role) {
    await this.roleRepository.update(id, roleToUpdate);
  }

  async remove(id: number) {
    await this.roleRepository.remove(id);
  }
}
