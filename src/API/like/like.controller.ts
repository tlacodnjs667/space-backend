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
import { CreateLikeDto, CreateReviewLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  addWishlist(
    @Headers('user') userId: number,
    @Body() likeOption: CreateLikeDto,
  ) {
    return this.likeService.addWishlist(userId, likeOption);
  }

  @Get()
  getWishlist(@Headers('user') userId: number) {
    return this.likeService.getWishlist(+userId);
  }

  @Patch()
  update(@Headers('user') userId: number, @Body() item: UpdateLikeDto) {
    return this.likeService.updateWishlist(userId, item);
  }

  @Delete()
  deleteWishlist(
    @Headers('user') userId: number,
    @Query('likeId') likeId: number,
  ) {
    return this.likeService.deleteWishlist(userId, likeId);
  }

  @Post('calendar')
  addCalendarLike(
    @Headers('user') userId: number,
    @Body('calendarId') calendarId: number,
  ) {
    return this.likeService.addCalendarLike(userId, calendarId);
  }

  @Post('review')
  addReviewLike(
    @Headers('user') userId: number,
    @Body() review: CreateReviewLikeDto,
  ) {
    return this.likeService.addReviewLike(userId, review);
  }
}
