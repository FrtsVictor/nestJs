import { Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { UserMockUtils } from '../../mocks';
import { UserMapper } from '@app-api/users/user.mapper';
import { UserService } from '@app-api/users/user.service';
import { IUserRepository } from '@app-domain/users/user-repository.interface';
import { IUserService } from '@app-domain/users/user-service.interface';

describe('UserService', () => {
  const mockedUserRepository = mock<IUserRepository>();
  const userMockUtils = UserMockUtils.giveMe;
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
          useFactory: (userRepository: IUserRepository) =>
            new UserService(userRepository),
          inject: [IUserRepository],
        },
      ],
    }).compile();

    userService = moduleRef.get<IUserService>(IUserService);
  });

  it('expected to be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create method', () => {
    it('when valid user with roles should create user', async () => {
      const prismaUserCreateInputMock = userMockUtils().prismaUserCreateInput;
      const mockedSavedUser = userMockUtils().user;
      const mockedCrateUserDto = userMockUtils().createUserDto;

      const spyUserMapper = jest
        .spyOn(UserMapper, 'mapPrismaCreate')
        .mockReturnValue(prismaUserCreateInputMock);

      mockedUserRepository.create
        .calledWith(prismaUserCreateInputMock)
        .mockResolvedValue(mockedSavedUser);

      const result = await userService.create(mockedCrateUserDto);

      expect(result).toEqual(mockedSavedUser.id);
      expect(spyUserMapper).toBeCalledTimes(1);
      expect(spyUserMapper).toHaveBeenCalledWith(mockedCrateUserDto);
    });

    it('when valid user without roles should create user', async () => {
      const prismaUserCreateInputMock = userMockUtils().prismaUserCreateInput;
      const mockedSavedUser = userMockUtils().user;
      const mockedCrateUserDto = userMockUtils().createUserDto;

      mockedCrateUserDto.roles = undefined;
      prismaUserCreateInputMock.roles = undefined;

      const spyUserMapper = jest
        .spyOn(UserMapper, 'mapPrismaCreate')
        .mockReturnValue(prismaUserCreateInputMock);

      mockedUserRepository.create
        .calledWith(prismaUserCreateInputMock)
        .mockResolvedValue(mockedSavedUser);

      const result = await userService.create(mockedCrateUserDto);

      expect(result).toEqual(mockedSavedUser.id);
      expect(spyUserMapper).toBeCalledTimes(1);
      expect(spyUserMapper).toHaveBeenCalledWith(mockedCrateUserDto);
    });
  });
});
