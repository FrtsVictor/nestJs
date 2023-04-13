import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_JWT_CONFIG } from './constants';
import { PassportModule } from '@nestjs/passport';
import { authProviders } from './auth.providers';
import { UserModule } from '@app-modules/users/api/users.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      signOptions: APP_JWT_CONFIG.SIGN_OPTIONS,
      secret: APP_JWT_CONFIG.SECRET_KEY,
      verifyOptions: APP_JWT_CONFIG.VERIFY_OPTIONS,
    }),
  ],
  providers: [...authProviders],
  controllers: [AuthController],
})
export class AuthModule {}
