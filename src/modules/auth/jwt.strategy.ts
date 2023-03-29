import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { AuthenticatedUser } from './dto/authenticated-user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: AuthenticatedUser) {
    if (!payload || !payload.sub || !payload.email)
      throw new ForbiddenException('Invalid payload');

    delete payload.iat;

    return payload;
  }
}
