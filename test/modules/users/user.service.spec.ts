import { Test } from '@nestjs/testing';
import { IUserService } from '../../../src/modules/users/interface/user-service.interface';
import { IUserRepository } from '@app-modules/users/interface/user-repository.interface';
import { mock } from 'jest-mock-extended';
import { UserMockUtils } from '../../mocks';
import { UserMapper } from '@app-modules/users/user.mapper';
import { UserService } from '@app-modules/users/user.service';

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
