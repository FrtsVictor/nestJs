import { IUserRepository } from '../domain/user-repository.interface';
import { IUserService } from '../domain/user-service.interface';
import { User } from '../domain/user.model';
import { InvalidDomainException } from '@app-commons/domain/invalid-domain.exception';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async grantRoles(id: number, roles: number[]): Promise<void> {
    this.#validateRoles(roles);
    await this.userRepository.grantUserRoles(id, roles);
  }

  async revokeRoles(id: number, roles: number[]): Promise<void> {
    this.#validateRoles(roles);
    await this.userRepository.revokeRoles(id, roles);
  }

  async create(user: User) {
    return await this.userRepository.create(user);
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async update(id: number, user: User) {
    this.userRepository.update(id, user);
  }

  async remove(id: number) {
    this.userRepository.remove(id);
  }

  #validateRoles(roleIds: number[]) {
    roleIds.forEach((roleId) => {
      if (roleId <= 0)
        throw new InvalidDomainException(`Invalid role id: ${roleId}`);
    });
  }
}
