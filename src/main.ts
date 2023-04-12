import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from '@app-modules/app.module';
import { ApplicationLogger } from 'src/commons/api/logger/application-logger.log';
import { AppEnvironmentService } from 'src/commons/api/config/environment.service';

require('module-alias/register');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['verbose'],
  });

  const {
    httpConfig: { port },
  } = app.get(AppEnvironmentService);

  configureApplication(app);
  await app.listen(port);
}

function configureApplication(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useLogger(new ApplicationLogger());
}

bootstrap();
