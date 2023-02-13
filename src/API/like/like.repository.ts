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
    SELECT DISTINCT
    l.id AS id,
    aalll.name,
    aalll.thumbnail,
    aalll.price,
    c.name AS colorName,
    IFNULL(l.optionId, null) AS optionId,
       JSON_OBJECT(
      'id',po.sizeId,
      'name', s.name
    ) AS size,
    l.userId,
    options
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
        oo.color AS options
        FROM product p
        LEFT JOIN (
          SELECT
            p.id AS productId,
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'colorId', c.id,
                'colorName', c.name,
                'options', productOption.options
              ) 
        ) AS color
        FROM product p
        LEFT JOIN product_color pc ON p.id = pc.productId
        LEFT JOIN colors c ON c.id = pc.colorId
        LEFT JOIN (
          SELECT
            po.productColorId AS pcId,
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'sizeId', size.id,
                'size', size.name,
                'stock', stock,
                'optionId', IFNULL(po.id, null) 
              ) 
            ) AS options 
          FROM product_options po
          LEFT JOIN size ON size.id = po.sizeId
          GROUP BY pcId
        ) AS productOption ON productOption.pcId = pc.id
        GROUP BY p.id
    ) AS oo ON oo.productId = p.id
 GROUP BY p.id
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
