import { User } from './user.model';

export abstract class IUserService {
  abstract create(userToCreate: User): Promise<number>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: number): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract remove(id: number): Promise<void>;
  abstract update(id: number, userToUpdate: User): Promise<void>;
  abstract grantRoles(userId: number, roleIds: number[]): Promise<void>;
  abstract revokeRoles(userId: number, roleIds: number[]): Promise<void>;
}
