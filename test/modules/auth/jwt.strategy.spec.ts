import { AuthenticatedUser } from '@app-modules/auth/domain/authenticated-user';
import { ForbiddenException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthMockUtils } from '../../mocks';
import { JwtStrategy } from '@app-modules/auth/api/guards/jwt.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = moduleRef.get<JwtStrategy>(JwtStrategy);
  });

  it('expected to be defined', async () => {
    expect(jwtStrategy).toBeDefined();
  });

  describe('validate method', () => {
    it('When correctly payload should return authenticatedUser', async () => {
      const validUser = AuthMockUtils.giveMe().authenticatedUserMock;
      const expectedResult = await jwtStrategy.validate(validUser);

      expect(expectedResult.email).toEqual(validUser.email);
      expect(expectedResult.sub).toEqual(validUser.sub);
      expect(expectedResult.iat).not.toBeDefined();
    });

    it('When incorrectly payload should throw ForbiddenException', async () => {
      const validUser: AuthenticatedUser = { email: null, sub: null };

      await expect(jwtStrategy.validate(validUser)).rejects.toThrow(
        new ForbiddenException('Invalid payload'),
      );
    });
  });
});
