import * as crypto from 'crypto';

(global as any).crypto = crypto;

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); //Enabled global validation

  await app.listen(3000);
}
bootstrap();
