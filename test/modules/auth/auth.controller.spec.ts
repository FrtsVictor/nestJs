import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@app-modules/auth/api/auth.controller';
import { IAuthService } from '@app-modules/auth/domain/auth-service.interface';
import { mock } from 'jest-mock-extended';
import { AuthMockUtils } from '../../mocks';

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
    const jwtResponse = AuthMockUtils.giveMe().jwtResponseDtoMock;
    const authenticatedUserMock = AuthMockUtils.giveMe().authenticatedUserMock;

    mockedAuthService.login.mockReturnValue(
      AuthMockUtils.giveMe().jwtResponseDtoMock,
    );

    const resp = mockedAuthService.login(authenticatedUserMock);

    expect(mockedAuthService.login).toBeCalledWith(authenticatedUserMock);
    expect(mockedAuthService.login).toBeCalledTimes(1);
    expect(resp).toEqual(jwtResponse);
  });
});
