import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './commons/filter/exception/http-exception.filter';
import { ConfigurationModule } from './config/configuration.module';
import { TransformNestResponseInterceptor } from './core/http/transform-nest-response.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigurationModule, UserModule],
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
  ],
})
export class AppModule {}
