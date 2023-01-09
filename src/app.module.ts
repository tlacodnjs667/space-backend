import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
// import { typeOrmConfigAsync } from './orm.config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { CategoryModule } from './API/category/category.module';
import { CategoryController } from './API/category/category.controller';
import { CategoryService } from './API/category/category.service';
import { ProductController } from './API/product/product.controller';
import { ProductService } from './API/product/product.service';
import { ProductModule } from './product/product.module';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    CategoryModule,
    ProductModule,
  ],
  controllers: [UserController, CategoryController, ProductController],
  providers: [UserService, CategoryService, ProductService],
})
export class AppModule {}
