import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@app-modules/auth/auth.controller';
import { authenticateRequest, mockedAuthService } from './auth.mock';
import { IAuthService } from '@app-modules/auth/interfaces/auth-service.interface';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: IAuthService;

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

    authService = module.get<IAuthService>(IAuthService);
    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('when correctly user should return token response', async () => {
    jest.spyOn(authService, 'login').mockReturnValue(null);
    const response = await authController.login(authenticateRequest);

    expect(response).toBeNull();
  });
});
