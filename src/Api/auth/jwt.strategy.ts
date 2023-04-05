import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { jwtVerifyOptions } from '@app-domain/auth/constants';
import { AuthenticatedUser } from '@app-domain/auth/model/authenticated-user';

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
