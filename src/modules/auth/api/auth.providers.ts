import { Provider } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local-strategy';
import { IAuthService } from '../domain/auth-service.interface';
import { AuthService } from './auth.service';
import { IUserService } from '@app-modules/users/domain/users-service.interface';
import { JwtService } from '@nestjs/jwt';

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
