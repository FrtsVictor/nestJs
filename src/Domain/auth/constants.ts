import { JwtSignOptions } from '@nestjs/jwt';

export const jwtVerifyOptions: JwtSignOptions = {
  // algorithm: 'ES512',
  issuer: 'auth-issuer',
  secret: 'private-key',
  keyid: 'jwt-key-id',
};
