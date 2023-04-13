import { Provider } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local-strategy';
import { IAuthService } from '../domain/auth-service.interface';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from '@app-modules/users/domain/user-service.interface';

export const authProviders: Provider[] = [
  JwtStrategy,
  LocalStrategy,
  {
    provide: IAuthService,
    useFactory: (userService: IUserService, jwtService: JwtService) =>
      new AuthService(userService, jwtService),
    inject: [IUserService, JwtService],
  },
];
