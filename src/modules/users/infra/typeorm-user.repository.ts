import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { IUserRepository } from '../domain/users-repository.interface';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import { User } from '../domain/model/user.model';
import { UserDomainEntityMapper } from './user-domain-entity.mapper';
import { DataBaseException } from '@app-commons/infra/database-exception';

export class TypeormUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async grantUserRoles(userId: number, roles: number[]): Promise<void> {
    const userRolesToAdd = roles.map((roleId) => ({
      role_id: roleId,
      user_id: userId,
    }));

    try {
      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into('user_roles')
        .values(userRolesToAdd)
        .execute();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.error(error.message);
        throw new DataBaseException(error.driverError);
      }

      throw new DataBaseException('Error to add role into user');
    }
  }

  async revokeRoles(userId: number, roles: number[]): Promise<void> {
    const userRolesToRevoke = roles.map((roleId) => ({
      role_id: roleId,
      user_id: userId,
    }));

    await this.userRepository
      .createQueryBuilder()
      .delete()
      .from('user_roles')
      .whereInIds(userRolesToRevoke)
      .execute();
  }

  async create(user: User): Promise<number> {
    const userToBeSaved = UserDomainEntityMapper.userToEntity(user);

    return (await this.userRepository.save(userToBeSaved)).id;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: { roles: true },
    });
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
    const userByEmail = await this.userRepository.findOne({
      where: { email },
      relations: { roles: true },
    });

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
