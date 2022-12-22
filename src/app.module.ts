import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
// import { DatabaseModule } from './database/database.module';
import { DatabaseModule } from './database/database.module';
import { PhotoModule } from './photo/photo.module';
dotenv.config();
// type: process.env.TYPEORM_CONNECTION,

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [],
      synchronize: false,
    }),
    DatabaseModule,
    PhotoModule,
    // DatabaseModule,
  ],
  
})
export class AppModule {}
