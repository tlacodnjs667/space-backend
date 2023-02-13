import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  Headers,
  Param,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto, CreateReviewLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async addWishlist(
    @Headers('user') userId: number,
    @Body() likeOption: CreateLikeDto,
  ) {
    return this.likeService.addWishlist(userId, likeOption);
  }

  @Get()
  getWishlist(@Query('user') userId: number) {
    return this.likeService.getWishlist(+userId);
  }

  @Patch()
  update(@Headers('user') userId: number, @Body() item: UpdateLikeDto) {
    return this.likeService.updateWishlist(userId, item);
  }

  @Delete()
  async deleteWishlist(
    @Headers('user') userId: number,
    @Query('likeId') likeId: number,
  ) {
    await this.likeService.deleteWishlist(userId, likeId);
    const message = 'delete';
    return message;
  }

  @Post('calendar/:calendarId')
  async addCalendarLike(
    @Headers('user') userId: number,
    @Param('calendarId') calendarId: string,
  ) {
    const { insertId } = await this.likeService.addCalendarLike(
      userId,
      +calendarId,
    );

    return { insertId, message: 'LIKE_CLICKED' };
  }

  @Post('review')
  addReviewLike(
    @Headers('user') userId: number,
    @Body() review: CreateReviewLikeDto,
  ) {
    return this.likeService.addReviewLike(userId, review);
  }
}
