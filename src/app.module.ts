import { AuthModule } from './auth/auth-module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './commons/filter/exception/http-exception.filter';
import { ConfigurationModule } from './config/configuration.module';
import { TransformNestResponseInterceptor } from './core/http/transform-nest-response.interceptor';
import { UserModule } from './user/user.module';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';

@Module({
  imports: [ConfigurationModule, AuthModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformNestResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
