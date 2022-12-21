import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';

import * as dotenv from 'dotenv';
dotenv.config();
// type: process.env.TYPEORM_CONNECTION,

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      retryAttempts: 5,
    }),
  ],
  controllers: [UserController],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
