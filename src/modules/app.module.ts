import { AuthModule } from './auth/api/auth.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '../core/filter/exception/http-exception.filter';
import { ConfigurationModule } from '../core/config/configuration.module';
import { TransformNestResponseInterceptor } from '../core/http/transform-nest-response.interceptor';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { PrismaModule } from '../database/prisma.module';
import { ApplicationLoggerModule } from '@app-core/logger/application-logger.module';
import { UserModule } from './users/api/user.module';
import { RoleModule } from './roles/api/role.module';
import { TypeormModule } from './typeorm/typeorm.module';

@Module({
  imports: [
    ConfigurationModule,
    ApplicationLoggerModule,
    TypeormModule,
    PrismaModule,
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
