import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
// import { typeOrmConfigAsync } from './orm.config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { MainModule } from './main/main.module';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    MainModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
