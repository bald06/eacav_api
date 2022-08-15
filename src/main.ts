import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
