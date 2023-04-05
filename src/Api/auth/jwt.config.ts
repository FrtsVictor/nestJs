import { jwtVerifyOptions } from '@app-domain/auth/constants';
import { JwtModule } from '@nestjs/jwt';

export const jtwConfigModule = JwtModule.register({
  signOptions: { expiresIn: '60m' },
  secretOrPrivateKey: jwtVerifyOptions.secret,
  verifyOptions: jwtVerifyOptions,
});
