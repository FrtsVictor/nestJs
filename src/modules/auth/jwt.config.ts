import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

export const jtwConfigModule = JwtModule.register({
  signOptions: { expiresIn: '60s' },
  secretOrPrivateKey: jwtConstants.secret,
});
