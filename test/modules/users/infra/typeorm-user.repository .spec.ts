import { getDataSource } from '@app-modules/database/typeorm-data-source';
import { User } from '@app-modules/users/domain/model/user.model';
import { UserEntity } from '@app-modules/users/database/model/user.entity';
import { TypeormUserRepository } from '@app-modules/users/database/typeorm-user.repository';
import { env } from 'process';
import { DataSource, EntityNotFoundError, Repository } from 'typeorm';

describe('TypeormUserRepository', () => {
  let dataSource: DataSource;
  let userRepository: Repository<UserEntity>;
  let repository: TypeormUserRepository;

  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password',
  };

  beforeEach(async () => {
    console.log(process.env.DB_HOST)
    // dataSource = await getDataSource({
    //   host: process.env.DB_HOST,
    //   pass: process.env.DB_PASSWORD,
    //   port: parseInt(process.env.DB_PORT),
    //   user: process.env.DB_USER,
    // }).initialize();

    // userRepository = dataSource.getRepository(UserEntity);
    // repository = new TypeormUserRepository(userRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a new user and return their id', async () => {
      const saveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValueOnce(mockUser as UserEntity);

      const result = await repository.create(mockUser as User);

      expect(saveSpy).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser.id);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const findSpy = jest
        .spyOn(userRepository, 'find')
        .mockResolvedValueOnce([mockUser] as UserEntity[]);

      const result = await repository.findAll();

      expect(findSpy).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user by their id', async () => {
      const findOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(mockUser as UserEntity);

      const result = await repository.findOne(mockUser.id);

      expect(findOneSpy).toHaveBeenCalledWith({ where: { id: mockUser.id } });
      expect(result).toEqual(mockUser);
    });

    it('should throw EntityNotFoundError if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(repository.findOne(999)).rejects.toThrow(
        new EntityNotFoundError(UserEntity, 'Entity with id: ${id} not found'),
      );
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const userToUpdate = {
        ...mockUser,
        name: 'Jane Doe',
      };
      jest;
      //   .spyOn(repository, '#findOneOrThrow')
      //   .mockResolvedValueOnce(userToUpdate as UserEntity);
      // const saveSpy = jest
      //   .spyOn(userRepository, 'save')
      //   .mockResolvedValueOnce(userToUpdate as UserEntity);

      // await repository.update(mockUser.id, userToUpdate);

      // expect(saveSpy).toHaveBeenCalledWith(userToUpdate);
    });
  });

  describe('remove', () => {
    it('should remove an existing user', async () => {
      const userToDelete = mockUser as UserEntity;
      // jest
      //   .spyOn(repository, '#findOneOrThrow')
      //   .mockResolvedValueOnce(userToDelete);
      const removeSpy = jest
        .spyOn(userRepository, 'remove')
        .mockResolvedValueOnce(undefined);

      await repository.remove(mockUser.id);

      expect(removeSpy).toHaveBeenCalledWith(userToDelete);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by their email', async () => {
      const findOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(mockUser as UserEntity);

      const result = await repository.findByEmail(mockUser.email);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: { email: mockUser.email },
        relations: { roles: true },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('grantUserRoles', () => {
    it('should add roles to user', async () => {
      const roleIds = [1, 2];
      const insertMock = jest.fn().mockResolvedValueOnce(undefined);
      // jest
      // .spyOn(userRepository, 'createQueryBuilder')
      // .mockReturnValueOnce({ insert: insertMock });

      await repository.grantUserRoles(mockUser.id, roleIds);

      // expect(insertMock)
      //   .toHaveBeenCalledWith()
      //   .into('user_roles')
      //   .values([
      //     { role_id: roleIds[0], user_id: mockUser.id },
      //     { role_id: roleIds[1], user_id: mockUser.id },
      //   ])
      //   .execute();
    });

    it('should throw DataBaseException if adding roles fails', async () => {
      // jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValueOnce({
      //   insert: () => ({
      //     into: () => ({
      //       values: () => ({
      //         execute: () => Promise.reject(new Error('Failed')),
      //       }),
      //     }),
      //   }),
      // });
      // await expect(repository.grantUserRoles(mockUser.id, [1])).rejects.toThrow(
      //   DataBaseException,
      // );
    });
  });

  describe('revokeRoles', () => {
    it('should remove roles from user', async () => {
      const roleIds = [1, 2];
      // const deleteMock = jest.fn().mockResolvedValueOnce(undefined);
      // jest
      //   .spyOn(userRepository, 'createQueryBuilder')
      //   .mockReturnValueOnce({ delete: deleteMock });

      // await repository.revokeRoles(mockUser.id, roleIds);

      // expect(deleteMock)
      //   .toHaveBeenCalledWith()
      //   .from('user_roles')
      //   .whereInIds([
      //     { role_id: roleIds[0], user_id: mockUser.id },
      //     { role_id: roleIds[1], user_id: mockUser.id },
      //   ])
      //   .execute();
    });
  });
});
