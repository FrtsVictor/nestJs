import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import httpConfig from '../http/http.config';
import { EnvironmentService } from './environment.service';

const environmentToLoad = `${process.cwd()}/.env.${process.env.NODE_ENV}`;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environmentToLoad,
      load: [httpConfig],
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class ConfigurationModule {}
