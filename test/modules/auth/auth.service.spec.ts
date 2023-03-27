import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { IAuthService } from '@app-modules/auth/interfaces/auth-service.interface';
import { AuthService } from '@app-modules/auth/auth.service';
import { IUserService } from '@app-modules/users/interface/user-service.interface';
import {
  authenticatedUser,
  authenticateRequest,
  mockedJwtService,
  mockedToken,
  mockedUserRepository,
  wrongAuthRequest,
} from './auth.mock';
import { ForbiddenException } from '@nestjs/common';

describe('AuthService Test', () => {
  let authService: IAuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: IUserService,
          useValue: mockedUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
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
      const authenticatedUser = await authService.validateUser(
        authenticateRequest.email,
        authenticateRequest.password,
      );

      const findByEmailSpy = jest.spyOn(mockedUserRepository, 'findByEmail');

      expect(authenticatedUser).toBeDefined();
      expect(authenticatedUser).toEqual(authenticatedUser);
      expect(findByEmailSpy).toHaveBeenCalledWith(authenticateRequest.email);
      expect(findByEmailSpy).toHaveBeenCalledTimes(1);
    });

    it('When incorrectly credentials it should return forbiddenException', async () => {
      const findByEmailSpy = jest
        .spyOn(mockedUserRepository, 'findByEmail')
        .mockReturnValue(null);

      const authenticatedUser = await authService.validateUser(
        wrongAuthRequest.email,
        wrongAuthRequest.password,
      );

      expect(authenticatedUser).toBeInstanceOf(ForbiddenException);
      expect(findByEmailSpy).toHaveBeenCalledWith(wrongAuthRequest.email);
      expect(findByEmailSpy).toHaveBeenCalledTimes(1);
    });

    describe('UserService.Login()', () => {
      it('Should returns jwtBearerToken', async () => {
        const payload = authService.login(authenticatedUser);

        expect(payload).toBeDefined();
        expect(payload.accessToken).toBeDefined();
        expect(payload.accessToken).toEqual(mockedToken);
      });
    });
  });
});
