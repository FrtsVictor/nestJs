import { User } from './user.model';

export abstract class IUserRepository {
  abstract create(user: User): Promise<number>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: number): Promise<User>;
  abstract update(id: number, user: User): Promise<void>;
  abstract remove(id: number): Promise<void>;
  abstract findByEmail(email: string): Promise<User>;
  abstract grantUserRoles(request: {
    userId: number;
    roleIds: number;
  }): Promise<void>;
  abstract revokeRoles(request: {
    userId: number;
    roleIds: number;
  }): Promise<void>;
}
