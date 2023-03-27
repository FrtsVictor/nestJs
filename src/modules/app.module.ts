import { AuthModule } from './auth/auth.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '../core/filter/exception/http-exception.filter';
import { ConfigurationModule } from '../core/config/configuration.module';
import { TransformNestResponseInterceptor } from '../core/http/transform-nest-response.interceptor';
import { UserModule } from './users/user.module';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { PrismaModule } from '../database/prisma.module';
import { RoleModule } from './roles/role.module';
import { UserRolesModule } from './user-roles/user-roles.module';

@Module({
  imports: [
    ConfigurationModule,
    PrismaModule,
    AuthModule,
    UserModule,
    RoleModule,
    UserRolesModule,
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
