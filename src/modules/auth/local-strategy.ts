import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IAuthService } from './interfaces/auth-service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: IAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    return await this.authService.validateUser(email, password);
  }
}
