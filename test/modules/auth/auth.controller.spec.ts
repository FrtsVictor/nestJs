import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@app-modules/auth/auth.controller';
import { IAuthService } from '@app-modules/auth/interfaces/auth-service.interface';
import { mock } from 'jest-mock-extended';
import { AuthUtils } from './auth-utils.mock';

describe('AuthController', () => {
  let authController: AuthController;
  const mockedAuthService = mock<IAuthService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: IAuthService,
          useValue: mockedAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('when correctly user should return token response', async () => {
    const jwtResponse = AuthUtils.giveMe().jwtResponseDtoMock;
    const authenticatedUserMock = AuthUtils.giveMe().authenticatedUserMock;

    mockedAuthService.login.mockReturnValue(
      AuthUtils.giveMe().jwtResponseDtoMock,
    );

    const resp = mockedAuthService.login(authenticatedUserMock);

    expect(mockedAuthService.login).toBeCalledWith(authenticatedUserMock);
    expect(mockedAuthService.login).toBeCalledTimes(1);
    expect(resp).toEqual(jwtResponse);
  });
});
