import { Controller, Get, Param, Query } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('img')
  findReviewImageForMain(@Query('offset') offset: number) {
    if (!offset) offset = 0;
    return this.reviewService.findReviewImageForMain(+offset);
  }

  @Get('detail/:reviewId')
  getReviewFromProductID(@Param('reviewId') reviewId: string) {
    return this.reviewService.getReviewFromProductID(+reviewId);
  }
  @Get('related/:productId')
  getReviewImgRelated(
    @Param('productId') productId: string,
    @Query('page') page: string | number,
  ) {
    if (!page) page = 1;
    return this.reviewService.getReviewImgRelated(+productId, +page);
  }
}
