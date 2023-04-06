import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { IAuthService } from '../domain/auth-service.interface';
import { IUserRepository } from '@app-modules/users/domain/user-repository.interface';

export const authServiceProviders: Provider<any>[] = [
  {
    provide: IAuthService,
    useFactory: async (
      userRepository: IUserRepository,
      jwtService: JwtService,
    ) => new AuthService(userRepository, jwtService),
    inject: [IUserRepository, JwtService],
  },
];
