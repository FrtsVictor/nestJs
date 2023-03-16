import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import httpConfig from './http.config';
import { EnvironmentService } from './environment.service';

const environmentToLoad = `${process.cwd()}/.env.${process.env.NODE_ENV}`;
console.log(environmentToLoad);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environmentToLoad,
      load: [databaseConfig, httpConfig],
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class ConfigurationModule {}
