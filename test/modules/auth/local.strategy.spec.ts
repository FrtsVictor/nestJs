import { Test, TestingModule } from '@nestjs/testing';
import { IAuthService } from '@app-modules/auth/domain/auth-service.interface';
import { LocalStrategy } from '@app-modules/auth/api/local-strategy';
import { mock } from 'jest-mock-extended';
import { AuthMockUtils } from '../../mocks';
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
      const { email, password } = AuthMockUtils.giveMe().validateParams;
      const mock = AuthMockUtils.giveMe().authenticatedUserMock;

      mockedAuthService.login.mockResolvedValue(mock);

      const result = await localStrategy.validate(email, password);

      expect(result).toEqual(mock);
      expect(mockedAuthService.login).toBeCalledTimes(1);
    });

    it('when fail should throw ForbiddenException', async () => {
      mockedAuthService.login.mockRejectedValue(
        new ForbiddenException('Invalid user or password'),
      );

      await expect(localStrategy.validate('', '')).rejects.toThrow(
        'Invalid user or password',
      );

      expect(mockedAuthService.login).toBeCalledTimes(1);
    });
  });
});
