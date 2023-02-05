import { AppDataSource } from 'src/config/database-config';
import { Review } from 'src/entities/review.entity';
import { SHIPMENT_STATUS } from '../order/StatusEnum';
import {
  CreateCalendarReviewDto,
  CreateEventReviewDto,
  UpdateEventReview,
} from './dto/create-review.dto';
import { IReviewCanCreate, IReviewInfo } from './IReviewInterface';

export const ReviewRepository = AppDataSource.getRepository(Review).extend({
  checkReviewDuplication: (userId: number, productId: number) => {
    return ReviewRepository.query(`
        SELECT 
	        id
        FROM review
        WHERE userId = ${userId} AND productId = ${productId} 
    `);
  },

  checkAuthorOfReview: (reviewId: number) => {
    return ReviewRepository.query(`
        SELECT 
          userId 
        FROM review
        WHERE id = ${reviewId}
    `);
  },

  createReviewOfProduct(keyQuery: string, valueQuery: string) {
    return ReviewRepository.query(`
        INSERT INTO review (
          ${keyQuery}
        ) VALUES (
          ${valueQuery}
        )
    `);
  },

  createReviewForCalendar(
    userId: number,
    createReviewDto: CreateCalendarReviewDto,
  ) {
    return ReviewRepository.query(`
        INSERT INTO calendar_comments (
          userId,
          calendarId,
          comment
        ) VALUES (
          ${userId},
          ${createReviewDto.calendarId},
          '${createReviewDto.comment}'
        )
    `);
  },
  createReviewForEvent(userId: number, createReviewDto: CreateEventReviewDto) {
    return ReviewRepository.query(`
        INSERT INTO calendar_comments (
          userId,
          calendarId,
          comment
        ) VALUES (
          ${userId},
          ${createReviewDto.eventId},
          '${createReviewDto.comment}'
        )
    `);
  },
  async updateReviewOfProduct(reviewId: number, queyrToUpdate: string) {
    ReviewRepository.query(`
      UPDATE review
      SET ${queyrToUpdate}
      WHERE reviewId = ${reviewId}
    `);
  },

  getWhichReviewUserCanWriteReview(
    userId: number,
  ): Promise<IReviewCanCreate[]> {
    return ReviewRepository.query(`
        SELECT DISTINCT
	        pc.productId,
	        o.userId AS orderuser,
          p.name,
          p.thumbnail,
          s.name AS sizeName,
          c.name AS colorName
        FROM order_products op
        LEFT JOIN orders o ON op.orderId = o.id
        LEFT JOIN product_options po ON po.id = op.productOptionId
        LEFT JOIN size s ON po.sizeId = s.id
        LEFT JOIN product_color pc ON po.productColorId = pc.id
        LEFT JOIN colors c ON pc.colorId = c.id
        LEFT JOIN product p ON pc.productId = p.id
        LEFT JOIN (
        	SELECT
        		p.id AS productId,
            p.thumbnail,
            p.name,
	          rrr.userId AS rrruser
        FROM order_products op
        LEFT JOIN orders o ON op.orderId = o.id
        LEFT JOIN product_options po ON po.id = op.productOptionId
        LEFT JOIN product_color pc ON po.productColorId = pc.id
        LEFT JOIN (
        	SELECT
        		p.id AS productId,
        		r.id AS reviewId,
        		r.userId,
        		r.content
        	FROM product p
        	LEFT JOIN review r ON r.productId = p.id
        ) AS rrr ON rrr.productId = pc.productId AND rrr.userId = o.userId
        WHERE rrr.id IS NULL AND o.userId = ${userId} AND op.shipmentStatusId = ${SHIPMENT_STATUS.PURCHASE_CONFIRMED}
    `);
  },

  async getScoreCountById(productId: number) {
    return ReviewRepository.query(`
        SELECT
          COUNT(star) AS count,
          star
        FROM review
        WHERE productId = ${productId}
        GROUP BY star
    `);
  },

  getScoreAvgById: async (productId: number) => {
    return ReviewRepository.query(`
        SELECT 
          AVG(star) AS starAvg 
        FROM review 
        WHERE productId = ${productId}
    `);
  },

  getReviewByProductId: async (
    productId: number,
    offset: number,
    ordering: string,
    conditionQuery: string,
  ) => {
    return ReviewRepository.query(`
        SELECT 
	        r.id,
	        r.title,
	        r.content,
	        r.created_at,
	        r.star,
	        r.thumbnail,
	        u.nickname,
	        unhelpful.unhelpful,
	        helpful.helpful
        FROM review r
        LEFT JOIN user u ON r.userId = u.id
        LEFT JOIN (
        	SELECT
        		rl.reviewId,
        		COUNT(rl.is_helpful) AS helpful
        	FROM review_likes rl
        	WHERE rl.is_helpful = TRUE
        	GROUP BY rl.reviewId
        ) AS helpful ON helpful.reviewId = r.id
        LEFT JOIN (
        	SELECT
        		rl.reviewId,
        		COUNT(rl.is_helpful) AS unhelpful
        	FROM review_likes rl
        	WHERE rl.is_helpful = FALSE
        	GROUP BY rl.reviewId
        ) AS unhelpful ON unhelpful.reviewId = r.id
        WHERE productId = ${productId} ${conditionQuery}
        `);
    // ORDER BY ${ordering}
    // LIMIT 10 OFFSET ${offset}
  },

  getReviewByUserId(userId: number, offset: number): Promise<IReviewInfo[]> {
    return ReviewRepository.query(`
        SELECT
          r.id,
          r.productId,
          r.thumbnail,
          r.title,
          r.content,
          r.created_at,
          r.updated_at,
          r.star
        FROM review r
        WHERE userId = ${userId}
        LIMIT 10 OFFSET ${offset}
    `);
  },

  getReviewByCalendar(calendarId: number) {
    return ReviewRepository.query(`
        SELECT
          cc.id AS commentId,
          cc.comment,
          cc.created_at,
          user.nickname
        FROM calendar_comments cc
        LEFT JOIN user ON cc.userId = user.id
        WHERE calendarId = ${calendarId}
    `);
  },

  getReviewByEvent(eventId: number) {
    return ReviewRepository.query(`
        SELECT
          ec.id AS commentId,
          ec.comment,
          ec.created_at,
          user.nickname
        FROM event_comments ec
        LEFT JOIN user ON ec.userId = user.id
        WHERE eventId = ${eventId}
    `);
  },

  getReviewCount(queryToCount: string) {
    return ReviewRepository.query(`
        SELECT 
          COUNT(*) as count
        ${queryToCount}
    `);
  },
  getReviewAtMain() {
    return ReviewRepository.query(`
      SELECT 
        id AS reviewId,
        thumbnail
      from review 
      ORDER BY rand()
      LIMIT 11 OFFSET 0;
    `);
  },

  updateEventReview(userId: number, infoToUpdate: UpdateEventReview) {
    return ReviewRepository.query(`
        UPDATE event_comments 
        SET comment = '${infoToUpdate.comment}'
        WHERE id = ${infoToUpdate.commentId} AND userId = ${userId}
    `);
  },

  updateCalendarReview(userId: number, infoToUpdate: UpdateEventReview) {
    return ReviewRepository.query(`
        UPDATE calendar_comments 
        SET comment = '${infoToUpdate.comment}'
        WHERE id = ${infoToUpdate.commentId} AND userId = ${userId}
    `);
  },

  checkCommentAuthor(userId: number, commentId: number, query: string) {
    return ReviewRepository.query(`
        SELECT
	        id
        FROM ${query}_comments
        WHERE userId = ${userId} AND id = ${commentId}
    `);
  },

  checkCommentDuplication(userId: number, id: number, query: string) {
    return ReviewRepository.query(`
        SELECT
	        id
        FROM ${query}_comments
        WHERE userId = ${userId} AND ${query}Id = ${id}
    `);
  },

  deleteReview: (commentId: number, query: string) => {
    return ReviewRepository.query(`
        DELETE FROM ${query}_comments WHERE id = ${commentId}
    `);
  },

  deleteReviewOfProduct: (reviewId: number) => {
    return ReviewRepository.query(`
        DELETE FROM review WHERE id = ${reviewId}
    `);
  },
});
