import { Role } from './role';

export abstract class IRoleService {
  abstract create(roleToCreate: Role): Promise<number>;
  abstract findAll(): Promise<Role[]>;
  abstract findOne(id: number): Promise<Role>;
  abstract update(id: number, roleToUpdate: Role): Promise<void>;
  abstract remove(id: number): Promise<void>;
}
