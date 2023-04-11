import { IAuthService } from '@app-modules/auth/domain/auth-service.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: IAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    return await this.authService.login(email, password);
  }
}
