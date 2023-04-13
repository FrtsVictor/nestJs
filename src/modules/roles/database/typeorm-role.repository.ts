import { IRoleRepository } from '@app-modules/roles/domain/role-repository.interface';
import { RoleEntity } from '@app-modules/roles/database/model/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Role } from '../domain/role';
import { RoleDomainEntityMapper } from './role-domain-entity.mapper';

export class TypeormRoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async create(roleToCreate: Role): Promise<number> {
    const roleToBeSaved = RoleDomainEntityMapper.domainToEntity(roleToCreate);
    return (await this.roleRepository.save(roleToBeSaved)).id;
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    return await this.#findOneOrThrow(id);
  }

  async update(id: number, roleToUpdate: Role): Promise<void> {
    const roleToBeUpdated = await this.#findOneOrThrow(id);
    roleToBeUpdated.name = roleToUpdate.name;

    await this.roleRepository.save(roleToBeUpdated);
  }

  async remove(id: number): Promise<void> {
    const roleToBeRemoved = await this.#findOneOrThrow(id);

    await this.roleRepository.delete(roleToBeRemoved);
  }

  async #findOneOrThrow(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role)
      throw new EntityNotFoundError(
        RoleEntity,
        'Entity with id: ${id} not found',
      );

    return role;
  }
}
