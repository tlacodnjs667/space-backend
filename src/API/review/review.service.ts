import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateCalendarReviewDto,
  CreateEventReviewDto,
  CreateReviewDto,
  UpdateEventReview,
  UpdateProductReviewDto,
} from './dto/create-review.dto';
import { IReviewCanCreate } from './IReviewInterface';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  async createReviewOfProduct(
    userId: number,
    createReviewInfo: CreateReviewDto,
  ) {
    const checkDuplication = await ReviewRepository.checkReviewDuplication(
      userId,
      createReviewInfo.productId,
    );

    if (checkDuplication.length)
      throw new HttpException('DUPLICATED_REVIEW', HttpStatus.FORBIDDEN);

    const keys = ['userId'];
    const values = [userId];

    for (const [key, value] of Object.entries(createReviewInfo)) {
      if (value) {
        keys.push(key);
        values.push(value);
      }
    }

    const { insertId } = await ReviewRepository.createReviewOfProduct(
      keys.join(', '),
      values.join(', '),
    );

    return { insertId, message: 'MESSAGE_CREATED' };
  }

  async createReviewForCalendar(
    userId: number,
    createReviewDto: CreateCalendarReviewDto,
  ) {
    const query = 'calendar';
    const commentDuplication = await ReviewRepository.checkCommentDuplication(
      userId,
      createReviewDto.calendarId,
      query,
    );

    if (commentDuplication.length)
      throw new HttpException('UNAUTHORIZED_AUTHOR', HttpStatus.FORBIDDEN);

    return ReviewRepository.createReviewForCalendar(userId, createReviewDto);
  }

  async createReviewForEvent(
    userId: number,
    createReviewDto: CreateEventReviewDto,
  ) {
    const query = 'event';
    const commentDuplication = await ReviewRepository.checkCommentDuplication(
      userId,
      createReviewDto.eventId,
      query,
    );

    if (commentDuplication.length)
      throw new HttpException('UNAUTHORIZED_AUTHOR', HttpStatus.FORBIDDEN);

    return ReviewRepository.createReviewForEvent(userId, createReviewDto);
  }

  async getReviewDetailAtMain(reviewId: number) {
    return ReviewRepository.getReviewDetailAtMain(reviewId);
  }

  async getReviewAtMain() {
    return ReviewRepository.getReviewAtMain();
  }

  async getWhichReviewUserCanWriteReview(
    userId: number,
  ): Promise<IReviewCanCreate[]> {
    return ReviewRepository.getWhichReviewUserCanWriteReview(userId);
  }

  async getReviewAvgByProductId(productId: number) {
    //프로덕트 리뷰 평점
    const scoreCount = await ReviewRepository.getScoreCountById(productId);
    const scoreAvg = await ReviewRepository.getScoreAvgById(productId);

    return { scoreCount, scoreAvg };
  }

  async getReviewByProductId(
    productId: number,
    page: number,
    ordering: 'rec' | 'score' | 'lately',
    score: 1 | 2 | 3 | 4 | 5 | undefined,
  ) {
    const orderObj = {
      rec: 'helpful.helpful - helpful.helpful ASC',
      score: 'star DESC',
      lately: 'created_at DESC',
    };
    let conditionQuery = '';
    if (score) conditionQuery = `AND star = ${score}`;

    const offset = (page - 1) * 10;

    return ReviewRepository.getReviewByProductId(
      productId,
      offset,
      orderObj[ordering],
      conditionQuery,
    );
  }

  getReviewByUserId(userId: number, offset: number) {
    if (!offset) offset = 0;
    return ReviewRepository.getReviewByUserId(userId, offset);
  }

  async getReviewByCalendar(calendarId: number) {
    const reviews = await ReviewRepository.getReviewByCalendar(calendarId);
    const queryToCount = `FROM calendar_comments WHERE calendarId = ${calendarId}`;
    const [count] = await ReviewRepository.getReviewCount(queryToCount);

    return { reviews, count };
  }

  async getReviewByEvent(eventId: number) {
    const reviews = await ReviewRepository.getReviewByEvent(eventId);
    const queryToCount = `FROM event_comments WHERE eventId = ${eventId}`;
    const [count] = await ReviewRepository.getReviewCount(queryToCount);

    return { reviews, count };
  }
  async updateProductReview(
    userId: number,
    updateReviewInfo: UpdateProductReviewDto,
  ) {
    const reviewId = updateReviewInfo.reviewId;
    const checkValidAuthor = await ReviewRepository.checkAuthorOfReview(
      reviewId,
    );

    if (checkValidAuthor.userId !== userId) {
      throw new HttpException('UNVALID_AUTHOR', HttpStatus.FORBIDDEN);
    }

    const queyrToUpdate = [];

    for (const [key, value] of Object.entries(updateReviewInfo)) {
      if (key === 'reviewId') continue;
      if (value) {
        queyrToUpdate.push(`${key} = ${value}`);
      }
    }

    return ReviewRepository.updateReviewOfProduct(
      reviewId,
      queyrToUpdate.join(', '),
    );
  }
  async updateEventReview(userId: number, infoToUpdate: UpdateEventReview) {
    const query = 'event';
    const checkComment = await ReviewRepository.checkCommentAuthor(
      userId,
      infoToUpdate.commentId,
      query,
    );

    if (!checkComment.length)
      throw new HttpException('UNAUTHORIZED_AUTHOR', HttpStatus.FORBIDDEN);

    await ReviewRepository.updateEventReview(userId, infoToUpdate);
  }

  async updateCalendarReview(userId: number, infoToUpdate: UpdateEventReview) {
    const query = 'calendar';
    const checkComment = await ReviewRepository.checkCommentAuthor(
      userId,
      infoToUpdate.commentId,
      query,
    );

    if (!checkComment.length)
      throw new HttpException('UNAUTHORIZED_AUTHOR', HttpStatus.FORBIDDEN);

    await ReviewRepository.updateEventReview(userId, infoToUpdate);
  }

  async deleteReviewOfProduct(userId: number, reviewId: number) {
    const checkAuthorOfReview = await ReviewRepository.checkAuthorOfReview(
      reviewId,
    );

    if (checkAuthorOfReview.userId !== userId) {
      throw new HttpException('UNVALID_AUTHOR', HttpStatus.FORBIDDEN);
    }

    return ReviewRepository.deleteReviewOfProduct(reviewId);
  }

  async deleteEventReview(userId: number, commentId: number) {
    const query = 'event';
    const checkComment = await ReviewRepository.checkCommentAuthor(
      userId,
      commentId,
      query,
    );

    if (!checkComment.length)
      throw new HttpException('UNVALID_AUTHOR', HttpStatus.FORBIDDEN);

    return ReviewRepository.deleteReview(commentId, query);
  }

  async deleteCalendarReview(userId: number, commentId: number) {
    const query = 'calendar';
    const checkComment = await ReviewRepository.checkCommentAuthor(
      userId,
      commentId,
      query,
    );

    if (!checkComment.length)
      throw new HttpException('UNVALID_AUTHOR', HttpStatus.FORBIDDEN);

    return ReviewRepository.deleteReview(commentId, query);
  }
}
