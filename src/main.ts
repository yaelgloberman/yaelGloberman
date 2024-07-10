import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from 'dotenv';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen('8000');
}
bootstrap();
