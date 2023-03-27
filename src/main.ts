import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from '@app-modules/app.module';

require('module-alias/register');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, //qd for usar o pipe vai ignorar td q vier a mais no request
      forbidNonWhitelisted: false, //pra dar erro se n iver a prop q a gente mapeia pra receber
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}

bootstrap();
