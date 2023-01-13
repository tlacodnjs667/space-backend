import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './config/database-config';

async function bootstrap() {
  await AppDataSource.initialize()
    .then(() => console.log('DATABASE HAS BEEN INITIALIZED!!'))
    .catch((err) => console.error(err));
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
