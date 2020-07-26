import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as config from 'config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const REDIS_CONFIG_HOST = config.get('redis').host;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: REDIS_CONFIG_HOST,
    },
  });
  await app.startAllMicroservicesAsync();
}
bootstrap();
