import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { httpConfig } from './http.config';
import { AppEnvironmentService } from './environment.service';
import { dataBaseConfig } from './typeorm.config';
import { existsSync } from 'node:fs';
import { AppConfigurationException } from './app-config.exception';

const getEnvironmentToLoad = () => {
  const path = `${process.cwd()}/.env.${process.env.NODE_ENV}`;

  if (!existsSync(path)) {
    throw new AppConfigurationException(
      `Env file not found for directory path: ${path}`,
    );
  }

  return path;
};
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvironmentToLoad(),
      load: [httpConfig, dataBaseConfig],
      cache: true,
    }),
  ],
  providers: [AppEnvironmentService],
  exports: [AppEnvironmentService],
})
export class AppConfigurationModule {}
