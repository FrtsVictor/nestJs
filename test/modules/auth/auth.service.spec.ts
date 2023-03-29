import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { IAuthService } from '@app-modules/auth/interfaces/auth-service.interface';
import { AuthService } from '@app-modules/auth/auth.service';
import { IUserService } from '@app-modules/users/interface/user-service.interface';
import { AuthUtils } from './auth-utils.mock';
import { mock } from 'jest-mock-extended';
import { jwtConstants } from '@app-modules/auth/constants';
import { JwtResponseDto } from '@app-modules/auth/dto/authenticated-response.dto';

describe('AuthService Test', () => {
  let authService: IAuthService;
  const mockedJwtService = mock<JwtService>();
  const mockedUserService = mock<IUserService>();
  const authUtils = AuthUtils.giveMe();

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

  describe('AuthService.ValidateUser()', () => {
    it('When correctly credentials it should return authenticated user', async () => {
      const { email, password } = authUtils.authenticationRequestMock;

      mockedUserService.findByEmail.mockResolvedValue(authUtils.getUserDtoMock);

      const authenticatedUser = await authService.validateUser(email, password);

      expect(authenticatedUser).toEqual(authUtils.authenticatedUserMock);
      expect(mockedUserService.findByEmail).toHaveBeenCalledWith(email);
      expect(mockedUserService.findByEmail).toHaveBeenCalledTimes(1);
    });

    it('When incorrectly credentials it should return forbiddenException', async () => {
      const { email, password } = authUtils.authenticationRequestMock;
      mockedUserService.findByEmail.mockResolvedValue(null);

      await expect(authService.validateUser(email, password)).rejects.toThrow(
        'Invalid user or password',
      );
      expect(mockedUserService.findByEmail).toHaveBeenCalledWith(email);
      expect(mockedUserService.findByEmail).toHaveBeenCalledTimes(1);
    });
  });

  describe('UserService.Login()', () => {
    it('when correct user should returns jwtBearerToken', async () => {
      const authenticatedUser = authUtils.authenticatedUserMock;
      mockedJwtService.sign.mockReturnValue(authUtils.bearerTokenMock);

      const payload = authService.login(authenticatedUser) as JwtResponseDto;

      expect(payload.accessToken).toBeDefined();
      expect(mockedJwtService.sign).toBeCalledTimes(1);
      expect(mockedJwtService.sign).toBeCalledWith(
        { sub: authenticatedUser.sub, email: authenticatedUser.email },
        {
          secret: jwtConstants.secret,
        },
      );
      expect(payload).toEqual(authUtils.jwtResponseDtoMock);
    });

    it('when incorrect user should throws ForbiddenException', () => {
      expect(authService.login).toThrow('Invalid user payload');
      expect(mockedJwtService.sign).toBeCalledTimes(0);
    });
  });
});
