import { JwtModule } from '@nestjs/jwt';
import { jwtVerifyOptions } from './constants';

export const jtwConfigModule = JwtModule.register({
  signOptions: { expiresIn: '60m' },
  secretOrPrivateKey: jwtVerifyOptions.secret,
  verifyOptions: jwtVerifyOptions,
});
