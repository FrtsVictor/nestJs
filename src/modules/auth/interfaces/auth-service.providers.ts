import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserService } from '../../../modules/users/interface/user-service.interface';
import { AuthService } from '../auth.service';
import { IAuthService } from './auth-service.interface';

export const authServiceProviders: Provider<any>[] = [
  {
    provide: IAuthService,
    useFactory: async (userService: IUserService, jwtService: JwtService) =>
      new AuthService(userService, jwtService),
    inject: [IUserService, JwtService],
  },
];
