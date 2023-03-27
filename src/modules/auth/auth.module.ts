import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { authServiceProviders } from './interfaces/auth-service.providers';
import { jtwConfigModule } from './jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local-strategy';

@Module({
  imports: [UserModule, PassportModule, { ...jtwConfigModule }],
  providers: [JwtStrategy, LocalStrategy, JwtService, ...authServiceProviders],
  controllers: [AuthController],
})
export class AuthModule {}
