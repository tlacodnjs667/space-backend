import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  Delete,
  Query,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  CreateCalendarReviewDto,
  CreateEventReviewDto,
  UpdateEventReview,
  CreateReviewReqDto,
  UpdateProductReviewReqDto,
} from './dto/create-review.dto';
import { IReviewCanCreate } from './IReviewInterface';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post('product')
  createReviewForProduct(@Req() req: CreateReviewReqDto) {
    const createReviewInfo = req.body;
    // console.log(req.body);
    // console.log(req.headers.user);
    if (
      !req.headers.user ||
      !req.body.productId ||
      !req.body.star ||
      !req.body.content
    ) {
      throw new HttpException('MISS_INFOMATION', HttpStatus.FORBIDDEN);
    }
    if (req.file) {
      const { location } = req.file;

      createReviewInfo.thumbnail = location;
    }
    const result = this.reviewService.createReviewOfProduct(
      req.headers.user,
      createReviewInfo,
    );

    return { message: 'REVIEW_CREATED', result };
  }

  @Post('calendar') // 켈린더 리뷰 쓰기
  createReviewForCalendar(
    @Headers('user') userId: number,
    @Body() createReviewDto: CreateCalendarReviewDto,
  ) {
    return this.reviewService.createReviewForCalendar(userId, createReviewDto);
  }

  @Post('event') // 이벤트 리뷰 쓰기
  createReviewForEvent(
    @Headers('user') userId: number,
    @Body() createReviewDto: CreateEventReviewDto,
  ) {
    return this.reviewService.createReviewForEvent(userId, createReviewDto);
  }

  @Get('creation') //마이페이지 => 작성 가능한 리뷰
  async getWhichReviewUserCanWriteReview(
    @Headers('user') userId: number,
  ): Promise<IReviewCanCreate[]> {
    return this.reviewService.getWhichReviewUserCanWriteReview(userId);
  }

  @Get('score/:productId') //프로덕트 디테일 내부, 평균 점수와 점수별 리뷰 수
  getReviewAvgByProduct(@Param('productId') productId: string) {
    return this.reviewService.getReviewAvgByProductId(+productId);
  }

  @Get('product/:productId') // 프로덕트 디테일 내부, 유저가 작성한 리뷰
  getReviewByProduct(
    @Param('productId') productId: string,
    @Query('page') page: string,
    @Query('ordering') ordering: 'rec' | 'score' | 'lately',
    @Query('condition') score: 1 | 2 | 3 | 4 | 5 | undefined,
  ) {
    return this.reviewService.getReviewByProductId(
      +productId,
      +page,
      ordering,
      score,
    );
  }

  @Get('user') //마이페이지 유저가 작성한 리뷰 보기
  getReviewByUserId(
    @Headers('user') userId: number,
    @Query('offset') offset: string,
  ) {
    return this.reviewService.getReviewByUserId(userId, +offset);
  }

  @Get('calendar/:calendarId') //캘린더별 코멘트
  getReviewByCalendar(@Param('calendarId') calendarId: string) {
    if (!calendarId) {
      throw new HttpException('CANNOT_FIND_CALENDAR_ID', HttpStatus.NOT_FOUND);
    }
    return this.reviewService.getReviewByCalendar(+calendarId);
  }

  @Get('event/:eventId') //이벤트별 코멘트
  getReviewByEvent(@Param('eventId') eventId: string) {
    return this.reviewService.getReviewByEvent(+eventId);
  }

  @Get('main/:reviewId')
  async getReviewDetailAtMain(@Param('reviewId') reviewId: string) {
    const [result] = await this.reviewService.getReviewDetailAtMain(+reviewId);
    return result;
  }

  @Get('main')
  getReviewAtMain() {
    return this.reviewService.getReviewAtMain();
  }

  @Get('/:reviewId')
  async getReviewByReviewId(
    @Headers('user') userId: number,
    @Param('reviewId') reviewId: string,
  ) {
    console.log(reviewId);

    const [result] = await this.reviewService.getReviewByReviewId(
      userId,
      +reviewId,
    );
    console.log(result);
    return result;
  }

  @Patch('product')
  async updateProductReview(@Req() req: UpdateProductReviewReqDto) {
    const updateReviewInfo = req.body;

    if (req.file) {
      const { location } = req.file;

      updateReviewInfo.thumbnail = location;
    }

    const result = await this.reviewService.updateProductReview(
      req.headers.user,
      updateReviewInfo,
    );

    return { result, message: 'REVIEW_UPDATED' };
  }

  @Patch('event') //이벤트 리뷰 수정
  updateEventReview(
    @Headers('user') userId: number,
    @Body() infoToUpdate: UpdateEventReview,
  ) {
    return this.reviewService.updateEventReview(+userId, infoToUpdate);
  }

  @Patch('calendar') //캘린더 리뷰 수정
  updateCalendarReview(
    @Headers('user') userId: number,
    @Body() infoToUpdate: UpdateEventReview,
  ) {
    return this.reviewService.updateCalendarReview(+userId, infoToUpdate);
  }

  @Delete('product/:reviewId')
  deleteReviewOfProduct(
    @Headers('user') userId: number,
    @Param('reviewId') reviewId: number,
  ) {
    return this.reviewService.deleteReviewOfProduct(userId, reviewId);
  }

  @Delete('event/:reviewId') // 이벤트 리뷰 삭제
  deleteEventReview(
    @Headers('user') userId: number,
    @Param('reviewId') reviewId: string,
  ) {
    return this.reviewService.deleteEventReview(userId, +reviewId);
  }
  @Delete('calendar/:reviewId') //캘린더 리뷰 삭제
  deleteCalendarReview(
    @Headers('user') userId: number,
    @Param('reviewId') reviewId: string,
  ) {
    return this.reviewService.deleteCalendarReview(userId, +reviewId);
  }
}
