import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthenticatedUser } from '../domain/authenticated-user';
import { APP_JWT_CONFIG } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: APP_JWT_CONFIG.SECRET_KEY,
    });
  }

  async validate(payload: AuthenticatedUser) {
    if (!payload || !payload.sub || !payload.email)
      throw new ForbiddenException('Invalid payload');

    return payload;
  }
}
