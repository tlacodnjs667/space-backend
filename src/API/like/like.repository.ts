import { AppDataSource } from 'src/config/database-config';
import { ProductLike } from 'src/entities/like.entity';

export const LikeRepository = AppDataSource.getRepository(ProductLike).extend({
  addWishlist: async (userId: number, productId: number, optionId: number) => {
    return LikeRepository.query(`
      INSERT INTO likes (
        userid, 
        productId,
        optionId 
      ) VALUES (${userId},${productId},${optionId ?? 'NULL'} )
    `);
  },
  checkWishlist: async (
    userId: number,
    productId: number,
    optionId: number,
  ) => {
    const checkWishlist = await LikeRepository.query(`
      SELECT
        l.id
      FROM likes l 
      WHERE l.userId = ${userId} AND l.productId = ${productId} AND l.optionId ${
      optionId ? '= ' + optionId : ' IS NULL'
    }
    `);
    return checkWishlist;
  },

  checkDeleteWishlist: async (
    userId: number,
    productId: number,
    optionId: number,
  ) => {
    const checkDeleteWishlist = await LikeRepository.query(`
      DELETE
      FROM likes
      WHERE userId = ${userId} AND productId = ${productId} AND optionId ${
      optionId ? '=' + optionId : 'IS NULL'
    }
    `);
    return checkDeleteWishlist;
  },

  deleteWishlist: (query: number) => {
    return LikeRepository.query(`
      DELETE
      FROM likes
    ${query}
    `);
  },

  getWishlist: (userId: number) => {
    return LikeRepository.query(`
    SELECT
    l.id AS id,
    aalll.name,
    aalll.thumbnail,
    aalll.price,
    c.name AS colorName,
    JSON_OBJECT(
      'id',po.sizeId,
      'name', s.name
    ) AS size,
    IFNULL(l.optionId, null) AS optionId,
    l.userId,
    aalll.color
  FROM likes l
  LEFT JOIN product_options po ON l.optionId = po.id
  LEFT JOIN product_color pc ON pc.id = po.productColorId
  LEFT JOIN colors c ON c.id = pc.colorId
  LEFT JOIN size s ON s.id = po.sizeId 
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
          'size', sizes.options	
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
        ) AS options
      FROM product_options po
      LEFT JOIN size s ON s.id = po.sizeId
      GROUP BY po.productColorId
    ) AS sizes ON sizes.productColorId = pc.id
    GROUP BY p.id, sizes.options
  ) AS aalll ON aalll.id = l.productId
  WHERE userId = ${userId}
    `);
  },

  updateWishlist: (userId: number, optionId: number, productId: number) => {
    return LikeRepository.query(`
      update likes
      SET optionId = ${optionId}
      WHERE userId = ${userId} AND id = ${productId}
    `);
  },

  addCalendarLike: async (userId: number, calendarId: number) => {
    return LikeRepository.query(`
      UPDATE launching_calendars
      SET likeCounting = likeCounting + 1
      WHERE id = ${calendarId}
    `);
  },

  addReviewLike: async (
    userId: number,
    is_helpful: number,
    reviewId: number,
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
    is_helpful: number,
    reviewId: number,
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
    is_helpful: number,
    reviewId: number,
  ) => {
    return LikeRepository.query(`
      DELETE
      FROM review_likes
      WHERE userId = ${userId} AND is_helpful = ${is_helpful} AND reviewId = ${reviewId}
    `);
  },
});
