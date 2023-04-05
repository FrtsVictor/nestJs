import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../domain/auth.service';
import { IAuthService } from '../domain/auth-service.interface';
import { IUserService } from '@app-modules/users/domain/user-service.interface';

export const authServiceProviders: Provider<any>[] = [
  {
    provide: IAuthService,
    useFactory: async (userService: IUserService, jwtService: JwtService) =>
      new AuthService(userService, jwtService),
    inject: [IUserService, JwtService],
  },
];
