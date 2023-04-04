import { CreateUserDto } from '@app-modules/users/dto/create-user.dto';
import { GetUserDto } from '@app-modules/users/dto/get-user.dto';
import { Prisma, User } from '@prisma/client';

export class UserMockUtils {
  static giveMe() {
    const name = 'Test Name';
    const email = 'test@test.com';
    const password = '123321';
    const id = 1;
    return {
      createUserDto: {
        name,
        email,
        password,
        roles: [1, 2, 3],
      } as CreateUserDto,
      prismaUserCreateInput: {
        name,
        email,
        password,
        roles: {
          createMany: {
            data: [{ role_id: 1 }, { role_id: 2 }, { role_id: 3 }],
          },
        },
      } as Prisma.UserCreateInput,
      user: { name, email, id } as User,
    };
  }
}
