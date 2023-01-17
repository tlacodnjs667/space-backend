import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './API/category/category.module';
import { ProductModule } from './API/product/product.module';
import { JwtModule } from '@nestjs/jwt';
import { CartModule } from './API/cart/cart.module';
import { UserModule } from './API/user/user.module';
import { AuthMiddleware } from './middleware/auth/auth.middleware';
import { CartController } from './API/cart/cart.controller';
import { MakeOrderNumsMiddleware } from './middleware/make-order-nums.middleware';
import { OrderController } from './API/order/order.controller';
import { LookbookModule } from './API/lookbook/lookbook.module';
import { CalendarModule } from './API/calendar/calendar.module';
import { FileUploaderMiddleware } from './middleware/file-uploader/file-uploader.middleware';
import { UserController } from './API/user/user.controller';
import { LikeController } from './API/like/like.controller';
import { OrderModule } from './API/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule,
    CategoryModule,
    ProductModule,
    CartModule,
    UserModule,
    JwtModule,
    LookbookModule,
    CalendarModule,
    OrderModule,
  ],
  exports: [JwtModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        CartController,
        LikeController,
        { path: '/review', method: RequestMethod.POST },
        { path: '/review', method: RequestMethod.PATCH },
        { path: '/review', method: RequestMethod.DELETE },
      );
    consumer
      .apply(MakeOrderNumsMiddleware)
      .forRoutes(
        { path: '/order/by-cart', method: RequestMethod.POST },
        { path: '/order/by-optionId', method: RequestMethod.POST },
      );
    consumer
      .apply(FileUploaderMiddleware)
      .forRoutes({ path: '/user/create', method: RequestMethod.POST });
  }
}
