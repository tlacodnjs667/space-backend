import { AppDataSource } from 'src/config/database-config';
import { ProductLike } from 'src/entities/like.entity';

export const LikeRepository = AppDataSource.getRepository(ProductLike).extend({
  addWishlist: async (userId: number, productId: string) => {
    return LikeRepository.query(`
      INSERT INTO likes (
        userid, 
        productId
      ) VALUES (${userId},${productId} )
    `);
  },
  checkWishlist: async (userId: number, productId: string) => {
    return LikeRepository.query(`
      SELECT
        l.id
      FROM likes l 
      WHERE l.userId = ${userId} AND l.productId = ${productId} 
    `);
  },

  checkDeleteWishlist: async (userId: number, productId: string) => {
    return LikeRepository.query(`
      DELETE
      FROM likes
      WHERE userId = ${userId} AND productId = ${productId}
    
    `);
  },

  deleteWishlist: (query: string) => {
    return LikeRepository.query(`
      DELETE
      FROM likes
    ${query}
    `);
  },

  getWishlist: (userId: number) => {
    return LikeRepository.query(`
      SELECT
		    aalll.id,
      	aalll.name,
      	aalll.thumbnail,
      	aalll.price,
        l.productId,
        l.userId,
        l.optionId,
        aalll.color
      FROM likes l
      LEFT JOIN( 
        SELECT
      	  p.id,
      	  p.name,
      	  p.thumbnail,
      	  p.description,
      	  p.price,
      	  JSON_ARRAYAGG(
      		  JSON_OBJECT(
		      	  'colorId',IFNULL(c.id, ''),
	      		  'colorName',IFNULL(c.name, ''),
	      		  'size', sizes.size	
      		  )
      	  ) AS color
        FROM main_sub_categories ms
        LEFT JOIN items i ON ms.id = i.mainSubCategoryId
        LEFT JOIN product p ON p.itemId = i.id
        LEFT JOIN product_color pc ON pc.productId = p.id
        LEFT JOIN colors c ON pc.colorId = c.id
        LEFT JOIN (
      		SELECT
      			po.productColorId,
      			JSON_ARRAYAGG(
      				JSON_OBJECT(
      				  'sizeId',IFNULL(s.id, ''),
      				  'sizeName',IFNULL(s.name, ''),
      				  'stock',IFNULL(po.stock, '')		
      			  ) 
      		  ) AS size
      		FROM product_options po
      		LEFT JOIN size s ON s.id = po.sizeId
      		GROUP BY po.productColorId
        ) AS sizes ON sizes.productColorId = pc.id
        GROUP BY p.id, sizes.size
      ) AS aalll ON aalll.id = l.productId
	    WHERE l.userId = ${userId}
    `);
  },

  updateWishlist: (userId: number, optionId: string, productId: string) => {
    return LikeRepository.query(`
      update carts
      SET optionId = ${optionId}
      WHERE userId = ${userId} AND id = ${productId}
    `);
  },

  addCalendarLike: async (userId: number, calendarId: string) => {
    return LikeRepository.query(`
      INSERT INTO calendar_likes (
        userid, 
        launchingCalendarId
      ) VALUES (${userId},${calendarId} )
    `);
  },

  addReviewLike: async (
    userId: number,
    is_helpful: string,
    reviewId: string,
  ) => {
    return LikeRepository.query(`
      INSERT INTO review_likes (
        userId, 
        is_helpful,
        reviewId
      ) VALUES (${userId}, ${is_helpful}, ${reviewId} )
    `);
  },
  checkReviewLike: async (
    userId: number,
    is_helpful: string,
    reviewId: string,
  ) => {
    return LikeRepository.query(`
      SELECT
	      id
      FROM review_likes
      WHERE userId = ${userId} AND is_helpful = ${is_helpful} AND reviewId = ${reviewId}
    `);
  },

  deleteReviewLike: async (
    userId: number,
    is_helpful: string,
    reviewId: string,
  ) => {
    return LikeRepository.query(`
      DELETE
      FROM review_likes
      WHERE userId = ${userId} AND is_helpful = ${is_helpful} AND reviewId = ${reviewId}
    `);
  },
});
