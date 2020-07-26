import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { UsersModule } from './users/users.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  });
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
  //   transport: Transport.REDIS,
  //   options: {
  //     url: 'redis://localhost:6379',
  //   },
  // });
  await app.startAllMicroservicesAsync();
}
bootstrap();
