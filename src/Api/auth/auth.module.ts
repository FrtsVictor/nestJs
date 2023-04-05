import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { jtwConfigModule } from './jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local-strategy';
import { UserModule } from '@app-api/users/user.module';
import { authServiceProviders } from './auth-service.providers';

@Module({
  imports: [UserModule, PassportModule, { ...jtwConfigModule }],
  providers: [JwtStrategy, LocalStrategy, JwtService, ...authServiceProviders],
  controllers: [AuthController],
})
export class AuthModule {}
