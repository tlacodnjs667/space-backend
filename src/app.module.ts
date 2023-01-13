import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { CategoryModule } from './API/category/category.module';
import { ProductModule } from './API/product/product.module';
import { JwtModule } from '@nestjs/jwt';
import { CartModule } from './API/cart/cart.module';
import { UserModule } from './API/user/user.module';
import { AuthMiddleware } from './middleware/auth/auth.middleware';
import { CartController } from './API/cart/cart.controller';
import { MakeOrderNumsMiddleware } from './middleware/auth/make-order-nums.middleware';
import { OrderController } from './API/order/order.controller';
import { LookbookModule } from './API/lookbook/lookbook.module';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    JwtModule,
    CategoryModule,
    ProductModule,
    CartModule,
    UserModule,
    JwtModule,
    LookbookModule,
  ],
  exports: [JwtModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        CartController,
        OrderController,
        { path: '/review', method: RequestMethod.POST },
        { path: '/review', method: RequestMethod.PATCH },
        { path: '/review', method: RequestMethod.DELETE },
      );
    consumer
      .apply(MakeOrderNumsMiddleware)
      .forRoutes({ path: '/order', method: RequestMethod.POST });
  }
}
