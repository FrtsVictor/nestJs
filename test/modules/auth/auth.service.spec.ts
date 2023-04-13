import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { IAuthService } from '@app-modules/auth/domain/auth-service.interface';
import { AuthMockUtils } from '../../mocks';
import { mock } from 'jest-mock-extended';
import { IUserService } from '@app-modules/users/domain/users-service.interface';
import { AuthService } from '@app-modules/auth/api/auth.service';

describe('AuthService', () => {
  let authService: IAuthService;
  const mockedJwtService = mock<JwtService>();
  const mockedUserService = mock<IUserService>();
  const authUtils = AuthMockUtils.giveMe();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: IUserService, useValue: mockedUserService },
        { provide: JwtService, useValue: mockedJwtService },
        {
          provide: IAuthService,
          useFactory: (userService: IUserService, jwtService: JwtService) =>
            new AuthService(userService, jwtService),
          inject: [IUserService, JwtService],
        },
      ],
    }).compile();

    authService = moduleRef.get<IAuthService>(IAuthService);
  });

  it('expected to be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser method', () => {
    it('When correctly credentials it should return authenticated user', async () => {
      const { email, password } = authUtils.authenticationRequestMock;

      mockedUserService.findByEmail.mockResolvedValue(authUtils.getUserDtoMock);

      const authenticatedUser = await authService.login(email, password);
      const expectedResult = authUtils.authenticatedUserMock;
      expectedResult.iat = undefined;

      expect(authenticatedUser).toEqual(expectedResult);
      expect(mockedUserService.findByEmail).toHaveBeenCalledWith(email);
      expect(mockedUserService.findByEmail).toHaveBeenCalledTimes(1);
    });

    it('When incorrectly credentials it should return forbiddenException', async () => {
      const { email, password } = authUtils.authenticationRequestMock;
      mockedUserService.findByEmail.mockResolvedValue(null);

      await expect(authService.login(email, password)).rejects.toThrow(
        'Invalid user or password',
      );
      expect(mockedUserService.findByEmail).toHaveBeenCalledWith(email);
      expect(mockedUserService.findByEmail).toHaveBeenCalledTimes(1);
    });
  });

  describe('login method', () => {
    it('when correct user should returns jwtBearerToken', async () => {
      const authenticatedUser = authUtils.authenticatedUserMock;
      mockedJwtService.sign.mockReturnValue(authUtils.bearerTokenMock);

      const payload = authService.getToken(authenticatedUser) as JwtResponseDto;

      expect(payload.accessToken).toBeDefined();
      expect(mockedJwtService.sign).toBeCalledTimes(1);
      expect(mockedJwtService.sign).toBeCalledWith(
        { sub: authenticatedUser.sub, email: authenticatedUser.email },
        {
          secret: jwtVerifyOptions.secret,
        },
      );
      expect(payload).toEqual(authUtils.jwtResponseDtoMock);
    });

    it('when incorrect user should throws ForbiddenException', () => {
      expect(authService.getToken).toThrow('Invalid user payload');
      expect(mockedJwtService.sign).toBeCalledTimes(0);
    });
  });
});
