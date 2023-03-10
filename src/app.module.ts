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
import { LookbookModule } from './API/lookbook/lookbook.module';
import { CalendarModule } from './API/calendar/calendar.module';
import { ReviewModule } from './API/review/review.module';
import { EventModule } from './API/event/event.module';
import { WeeklyCodyModule } from './API/weekly_cody/weekly_cody.module';
import { SnapModule } from './API/snap/snap.module';
import { OrderModule } from './API/order/order.module';
import { LikeModule } from './API/like/like.module';

import { FileUploaderMiddleware } from './middleware/file-uploader/file-uploader.middleware';
import { AuthMiddleware } from './middleware/auth/auth.middleware';
import { MakeOrderNumsMiddleware } from './middleware/make-order-nums.middleware';

import { CartController } from './API/cart/cart.controller';
import { LikeController } from './API/like/like.controller';

import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions/all-exceptions.filter';
import { CheckUserInfoFromAuthMiddleware } from './middleware/auth/check-user-info-from-auth.middleware';
import { ProductController } from './API/product/product.controller';
import { OrderController } from './API/order/order.controller';
import { ReviewController } from './API/review/review.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    JwtModule,
    CategoryModule,
    ProductModule,
    CartModule,
    UserModule,
    JwtModule,
    LookbookModule,
    CalendarModule,
    OrderModule,
    ReviewModule,
    EventModule,
    SnapModule,
    WeeklyCodyModule,
    LikeModule,
  ],
  exports: [JwtModule],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'review/product/:productId', method: RequestMethod.GET },
        { path: 'review/score/:productId', method: RequestMethod.GET },
        { path: 'review/calendar/:calendarId', method: RequestMethod.GET },
        { path: 'review/event/:eventId', method: RequestMethod.GET },
        { path: 'review/main', method: RequestMethod.GET },
        { path: 'review/img/:reviewId', method: RequestMethod.GET },
      )
      .forRoutes(
        CartController,
        OrderController,
        LikeController,
        ReviewController,
        { path: '/user/info', method: RequestMethod.GET },
        { path: '/user/mypage', method: RequestMethod.GET },
        { path: '/user/info', method: RequestMethod.PATCH },
      );
    consumer
      .apply(MakeOrderNumsMiddleware)
      .forRoutes(
        { path: '/order/by-cart', method: RequestMethod.POST },
        { path: '/order/by-optionId', method: RequestMethod.POST },
        { path: '/order/product-detail', method: RequestMethod.POST },
      );
    consumer
      .apply(FileUploaderMiddleware)
      .forRoutes(
        { path: '/user/create', method: RequestMethod.POST },
        { path: '/user/info', method: RequestMethod.PATCH },
        { path: '/review/product', method: RequestMethod.POST },
        { path: '/review/product', method: RequestMethod.PATCH },
      );
    consumer
      .apply(CheckUserInfoFromAuthMiddleware)
      .forRoutes(ProductController);
  }
}
