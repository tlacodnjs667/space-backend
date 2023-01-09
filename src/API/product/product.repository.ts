import { AppDataSource } from 'src/config/data-source';
import { Product } from 'src/entities/products.entity';

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  getWeeklyBestByCategory: (category: number) => {
    return ProductRepository.query(`
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
        			c.name
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
    return ProductRepository.query(`
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
            c.name
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
  getProductList: () => {
    return ProductRepository.query(`
	SELECT
	p.id,
	p.name,
	p.thumbnail,
	p.price,
	JSON_ARRAYAGG(
		JSON_OBJECT(
			'colorId',IFNULL(c.id, ''),
			'colorName',IFNULL(c.name, ''),
			'size', sizes.size	
		)
	) AS color
FROM product p
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
	`);
  },
});
