import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from '@app-modules/app.module';
import { ApplicationLogger } from '@app-core/logger/application-logger.log';

require('module-alias/register');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  configureApplication(app);
  const port = 3001;
  console.log(`Listening on port: ${port}`);
  await app.listen(port);
}

function configureApplication(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, //qd for usar o pipe vai ignorar td q vier a mais no request
      forbidNonWhitelisted: false, //pra dar erro se n iver a prop q a gente mapeia pra receber
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useLogger(new ApplicationLogger());
}

bootstrap();
