import { Prisma, User } from '@prisma/client';

export abstract class IUserRepository {
  abstract create(createUser: Prisma.UserCreateInput): Promise<User>;

  abstract findAll(): Promise<User[]>;

  abstract findOne(id: number): Promise<User>;

  abstract update(id: number, updateUser: Prisma.UserUpdateInput);

  abstract remove(id: number);

  abstract findByEmail(email: string): Promise<{
    id: number;
    email: string;
    password: string;
    name: string;
    roles: {
      id: number;
      assignedAt: Date;
    }[];
  }>;
}
