import { AppDataSource } from 'src/config/database-config';
import { Review } from 'src/entities/review.entity';
import {
  IProductReviewImg,
  IReviewDetailForMain,
  IReviewForMain,
} from './reviewInterface';

export const ReviewRepository = AppDataSource.getRepository(Review).extend({
  findReviewImageForMain(offset: number): Promise<IReviewForMain[]> {
    return ReviewRepository.query(`
        SELECT
          productId,
	        id AS reviewId,
	        r.thumbnail
        FROM review r
        LIMIT 10 OFFSET ${offset}
    `);
  },
  findReviewDetailFromImg(reviewId: number): Promise<IReviewDetailForMain[]> {
    return ReviewRepository.query(`
        SELECT
        	u.nickname,
        	r.content,
        	r.thumbnail,
        	r.star,
        	created_at,
        	JSON_ARRAYAGG(ri.thumbnail) AS photos,
        	rl.helpful,
          rdl.unhelpful,
          r.content,
        	r.productId
        FROM review r
        LEFT JOIN user u ON r.userId = u.id
        LEFT JOIN review_img ri ON ri.reviewId = r.id
        LEFT JOIN (
        	SELECT
        		reviewId,
        		COUNT(is_helpful) AS helpful
        	FROM review_likes
        	WHERE is_helpful = TRUE
        	GROUP BY reviewId
        ) AS rl ON rl.reviewId = r.id
        LEFT JOIN (
        	SELECT
        		reviewId,
        		COUNT(is_helpful) AS unhelpful
        	FROM review_likes
        	WHERE is_helpful = FALSE
        	GROUP BY reviewId
        ) AS rdl ON rdl.reviewId = r.id
        WHERE r.id = ${reviewId}
        GROUP BY r.id
    `);
  },
  getProductInfoWithReview(productId: number): Promise<IProductReviewImg[]> {
    return ReviewRepository.query(`
        SELECT
          p.id,
          p.name,
          p.thumbnail,
          COUNT(r.id) AS reviewCount,
          AVG(r.star) AS starAverage
        FROM review r
        RIGHT JOIN product p ON p.id = r.productId
        WHERE p.id = ${productId}
        GROUP BY r.productId, p.id
    `);
  },
  getReviewImgRelated(productId: number, offset: number) {
    return ReviewRepository.query(`
        SELECT
          JSON_OBJECT(
            'reviewId',r.id,
            'reviewImg',r.thumbnail
          ) AS imgs
        FROM review r
        WHERE productId = ${productId}
        LIMIT 12 OFFSET ${offset}
    `);
  },
});
