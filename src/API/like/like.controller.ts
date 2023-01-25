import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  Headers,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  addWishlist(
    @Headers('user') userId: number,
    @Body('productId') productId: string,
  ) {
    return this.likeService.addWishlist(userId, productId);
  }

  @Get()
  getWishlist(@Headers('user') userId: number) {
    return this.likeService.getWishlist(userId);
  }

  @Patch()
  update(@Headers('user') userId: number, @Body() item: UpdateLikeDto) {
    return this.likeService.updateWishlist(userId, item);
  }

  @Delete()
  deleteWishlist(
    @Headers('user') userId: number,
    @Query('productId') productId: string,
  ) {
    return this.likeService.deleteWishlist(userId, productId);
  }

  @Post('calendar')
  addCalendarLike(
    @Headers('user') userId: number,
    @Body('calendarId') calendarId: string,
  ) {
    return this.likeService.addCalendarLike(userId, calendarId);
  }

  @Post('review')
  addReviewLike(
    @Headers('user') userId: number,
    @Body() review: CreateLikeDto,
  ) {
    return this.likeService.addReviewLike(userId, review);
  }
}
