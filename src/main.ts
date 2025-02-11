import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const consoleLogger = new Logger('Main', { timestamp: true });
  const contex = await NestFactory.createApplicationContext(AppModule);
  const configService = contex.get(ConfigService);
  const NATS_URL = configService.get<string>('NATS_URL');
  await contex.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [NATS_URL],
      },
    },
  );
  consoleLogger.log('Email Microservice running in Nats');
  await app.listen();
}
bootstrap();
