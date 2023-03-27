import { UserService } from '../../../src/modules/users/user.service';
import { Test } from '@nestjs/testing';
import { CreateUserDto } from '../../../src/modules/users/dto/create-user.dto';
import { AppModule } from '../../../src/modules/app.module';
import { PrismaService } from '../../../src/database/prisma.service';
import { when } from 'jest-when';
import { IUserService } from '../../../src/modules/users/interface/user-service.interface';

describe('UserService', () => {
  let userService: IUserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    userService = moduleRef.get<IUserService>(IUserService);
  });

  describe('create', () => {
    it('should create user', async () => {
      const test = (param) => param;

      when(test).calledWith('asdasd').mockResolvedValue([]);

      // const data = new CreateUserDto();
      // data.email = 'victor@emailç.com';
      // data.name = 'victçor';
      // data.password = 'passssçsword';
      // await userService.create(data);
    });
  });
});
