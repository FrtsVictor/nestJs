import { AuthModule } from './auth/api/auth.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '../commons/api/filter/exception/http-exception.filter';
import { ConfigurationModule } from '../commons/api/config/configuration.module';
import { TransformNestResponseInterceptor } from '../commons/api/http/transform-nest-response.interceptor';
import { ApplicationLoggerModule } from 'src/commons/api/logger/application-logger.module';
import { UserModule } from './users/api/user.module';
import { RoleModule } from './roles/api/role.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { JwtAuthGuard } from '@app-commons/api/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigurationModule,
    ApplicationLoggerModule,
    TypeormModule,
    AuthModule,
    UserModule,
    RoleModule,
  ],
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
