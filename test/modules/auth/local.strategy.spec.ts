import { Test, TestingModule } from '@nestjs/testing';
import { IAuthService } from '@app-modules/auth/interfaces/auth-service.interface';
import { LocalStrategy } from '@app-modules/auth/local-strategy';
import { mock } from 'jest-mock-extended';
import { AuthUtils } from './auth-utils.mock';
import { ForbiddenException } from '@nestjs/common';

describe('LocalStrategy', () => {
  const mockedAuthService = mock<IAuthService>();
  let localStrategy: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IAuthService,
          useValue: mockedAuthService,
        },
        LocalStrategy,
      ],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
  });

  it('expected to be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  describe('validateUser method', () => {
    it('when success should return AuthenticatedUser', async () => {
      const { email, password } = AuthUtils.giveMe().validateParams;
      const mock = AuthUtils.giveMe().authenticatedUserMock;

      mockedAuthService.validateUser.mockResolvedValue(mock);

      const result = await localStrategy.validate(email, password);

      expect(result).toEqual(mock);
      expect(mockedAuthService.validateUser).toBeCalledTimes(1);
    });

    it('when fail should throw ForbiddenException', async () => {
      mockedAuthService.validateUser.mockRejectedValue(
        new ForbiddenException('Invalid user or password'),
      );

      await expect(localStrategy.validate('', '')).rejects.toThrow(
        'Invalid user or password',
      );

      expect(mockedAuthService.validateUser).toBeCalledTimes(1);
    });
  });
});
