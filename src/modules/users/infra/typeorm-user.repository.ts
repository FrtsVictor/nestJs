import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { IUserRepository } from '../domain/user-repository.interface';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from '../domain/user.model';
import { UserDomainEntityMapper } from './user-domain-entity.mapper';

export class TypeormUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async grantUserRoles(request: {
    userId: number;
    roleIds: number;
  }): Promise<void> {}
  async revokeRoles(request: {
    userId: number;
    roleIds: number;
  }): Promise<void> {}

  async create(user: User): Promise<number> {
    const userToBeSaved = UserDomainEntityMapper.userToEntity(user);
    return (await this.userRepository.save(userToBeSaved)).id;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (users) return UserDomainEntityMapper.userEntitiesToDomain(users);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.#findOneOrThrow(id);

    if (user) return UserDomainEntityMapper.userEntityToDomain(user);
  }

  async update(id: number, { email, name, password }: User) {
    const userToUpdate = await this.#findOneOrThrow(id);

    userToUpdate.email = email;
    userToUpdate.name = name;
    userToUpdate.password = password;
    await this.userRepository.save(userToUpdate);
  }

  async remove(id: number) {
    const userToDelete = await this.#findOneOrThrow(id);

    await this.userRepository.remove(userToDelete);
  }

  async findByEmail(email: string): Promise<User> {
    const userByEmail = await this.userRepository.findOne({ where: { email } });

    if (userByEmail)
      return UserDomainEntityMapper.userEntityToDomain(userByEmail);
  }

  async #findOneOrThrow(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user)
      throw new EntityNotFoundError(
        UserEntity,
        'Entity with id: ${id} not found',
      );

    return user;
  }
}
