import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthenticatedUser } from './dto/authenticated-user';
import { jwtVerifyOptions } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtVerifyOptions.secret,
    });
  }

  async validate(payload: AuthenticatedUser) {
    if (!payload || !payload.sub || !payload.email)
      throw new ForbiddenException('Invalid payload');

    delete payload.iat;

    return payload;
  }
}
