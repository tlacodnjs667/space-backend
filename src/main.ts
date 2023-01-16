import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './config/database-config';

async function bootstrap() {
  await AppDataSource.initialize()
    .then(() => console.log('DATABASE HAS BEEN INITIALIZED!!'))
    .catch((err) => console.error(err));
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'X-Requested-With',
      'access-control-allow-origin',
    ],
    optionsSuccessStatus: 204,
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
