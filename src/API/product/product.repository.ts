import { AppDataSource } from 'src/config/data-source';
import { Product } from 'src/entities/products.entity';

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  getWeeklyBestByCategory: (category: number) => {
    return AppDataSource.getRepository(Product).query(`
        SELECT
        	p.id, 
            p.name, 
            p.thumbnail, 
            p.price, 
            c.productColor,
            COUNT(r.id) AS review,
            AVG(star) AS point
        FROM product p
        LEFT JOIN review r ON r.productId = p.id
        LEFT JOIN items i ON p.itemId = i.id
        LEFT JOIN main_sub_categories ms ON ms.id = i.mainSubCategoryId
        LEFT JOIN (
        	SELECT 
        		pc.productId as productId,
        		JSON_ARRAYAGG(
        			c.fff
        		) AS productColor
        	FROM product_color pc
        	LEFT JOIN colors c ON c.id = pc.colorId
        	GROUP BY pc.productId
        ) AS c ON  c.productId = p.id
        WHERE mainCategoryId = ${category}
        GROUP BY p.id, c.productColor
        ORDER BY point DESC, p.id DESC
        LIMIT 8 OFFSET 0
    `);
  },
  getNewProduct: () => {
    return AppDataSource.getRepository(Product).query(`
      SELECT
          p.id, 
          p.name, 
          p.thumbnail, 
          p.price, 
          c.productColor,
          p.created_at,
          COUNT(r.id) AS review
      FROM product p
      LEFT JOIN review r ON r.productId = p.id
      LEFT JOIN items i ON p.itemId = i.id
      LEFT JOIN main_sub_categories ms ON ms.id = i.mainSubCategoryId
      LEFT JOIN (
        SELECT 
          pc.productId as productId,
          JSON_ARRAYAGG(
            c.fff
          ) AS productColor
        FROM product_color pc
        LEFT JOIN colors c ON c.id = pc.colorId
        GROUP BY pc.productId
      ) AS c ON  c.productId = p.id
      GROUP BY p.id, c.productColor
      ORDER BY p.created_at DESC
      LIMIT 11 OFFSET 0
    `);
  },
});
