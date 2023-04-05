import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../Domain/auth/auth.service';
import { IAuthService } from '@app-domain/auth/auth-service.interface';
import { IUserService } from '@app-domain/users/user-service.interface';

export const authServiceProviders: Provider<any>[] = [
  {
    provide: IAuthService,
    useFactory: async (userService: IUserService, jwtService: JwtService) =>
      new AuthService(userService, jwtService),
    inject: [IUserService, JwtService],
  },
];
