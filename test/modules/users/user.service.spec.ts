import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../src/database/prisma.service';
import { IUserService } from '../../../src/modules/users/interface/user-service.interface';
import { IUserRepository } from '@app-modules/users/interface/user-repository.interface';
import { mock } from 'jest-mock-extended';

describe('UserService', () => {
  const prismaService = mock<PrismaService>();
  const mockedUerService = mock<IUserService>();
  const mockedUserRepository = mock<IUserService>();

  let userService: IUserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: IUserRepository,
          useValue: mockedUserRepository,
        },
        {
          provide: IUserService,
          useValue: mockedUerService,
        },
      ],
    }).compile();

    userService = moduleRef.get<IUserService>(IUserService);
  });

  it('expected to be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create user', async () => {
      // const data = new CreateUserDto();
      // data.email = 'victor@emailç.com';
      // data.name = 'victçor';
      // data.password = 'passssçsword';
      // await userService.create(data);
    });
  });
});
