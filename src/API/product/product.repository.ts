import { off } from 'process';
import { AppDataSource } from 'src/config/database-config';
import { Product } from 'src/entities/products.entity';
import { OffsetWithoutLimitNotSupportedError } from 'typeorm';

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
  getProductList: (whereQuery: string, orderQuery: string, offset: number) => {
    return ProductRepository.query(`
    SELECT
      	p.id,
      	p.name AS name,
      	p.thumbnail,
      	p.description,
      	p.price AS price,
      	p.created_at AS news,
      	JSON_ARRAYAGG(
      		JSON_OBJECT(
		      	'colorId',IFNULL(c.id, ''),
	      		'colorName',IFNULL(c.name, ''),
	      		'size', sizes.size	
      		)
      	) AS color,
      	orderss.orderCount,
      	likess.likeCount,
		reviewss.reviewCount
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
      LEFT JOIN (
      	SELECT
      		p.id AS productId,
      		COUNT(op.id) AS orderCount
      	FROM product p
      	LEFT JOIN product_color pc ON p.id = pc.productId
      	LEFT JOIN product_options po ON po.productColorId = pc.id
      	LEFT JOIN order_products op ON op.productOptionId = po.id
      	GROUP BY p.id
      ) AS orderss ON orderss.productId = p.id
      LEFT JOIN (
      	SELECT
      		l.productId,
      		COUNT(l.id) AS likeCount
      	FROM likes l
      	GROUP BY l.productId
      ) AS likess ON likess.productId = p.id
          LEFT JOIN (
			SELECT 
				r.productId,
				COUNT(r.id) AS reviewCount
			FROM review r
			GROUP BY r.productId
		)  AS reviewss ON reviewss.productId = p.id
      ${whereQuery}
      GROUP BY p.id , orderss.orderCount, reviewss.reviewCount
      ${orderQuery}
      LIMIT 14 OFFSET ${offset}
	`);
  },
  getColorFilter: (query: string) => {
    return ProductRepository.query(`
    SELECT
    JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', c.id,
          'name', c.name
        )
      ) AS color
  FROM colors c
  INNER JOIN (
    SELECT DISTINCT
      pc.colorId
    FROM product_color pc 
    LEFT JOIN product p ON pc.productId = p.id
    LEFT JOIN items i ON p.itemId = i.id
    LEFT JOIN main_sub_categories ms ON i.mainSubCategoryId = ms.id
    ${query}
  ) AS colorInfo ON colorInfo.colorId = c.id
  `);
  },
  getItemFilter: (itemMainQurey: string, colorQurey: string) => {
    return ProductRepository.query(`
          SELECT
	          JSON_ARRAYAGG(
		      	  JSON_OBJECT(
		      		  'id', (i.id),
		      		  'name', i.name
		      	)
		      ) AS item
          FROM items i
          LEFT JOIN main_sub_categories ms ON i.mainSubCategoryId = ms.id
          INNER JOIN (
          	SELECT DISTINCT
          		p.itemId
          	FROM product p
          	LEFT JOIN product_color pc ON pc.productId = p.id
           ${colorQurey}
          ) AS itemInfo ON itemInfo.itemId = i.id
          ${itemMainQurey}
    `);
  },
  getGenderFilter: (query: string) => {
    return ProductRepository.query(`
    SELECT
    JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', m.id,
          'name', m.name
        )
      ) AS mainCate
  FROM main_categories m
  INNER JOIN (
    SELECT DISTINCT
      ms.mainCategoryId
    FROM main_sub_categories ms
    LEFT JOIN items i ON ms.id = i.mainSubCategoryId
    LEFT JOIN product p ON p.itemId = i.id
    LEFT JOIN product_color pc ON pc.productId = p.id
    ${query}
    ) AS main ON mainCategoryId = m.id
    `);
  },
  getProductDetail: (productId: string) => {
    return ProductRepository.query(`
    SELECT
      p.id,
      p.name,
      p.thumbnail,
      p.price, 	
      JSON_ARRAYAGG(
      	JSON_OBJECT(
      		'imageId', pi.id,
      		'image', pi.img_url
      	)
      ) AS productImages,
      oo.color AS options
    FROM product p
    LEFT JOIN product_image pi ON p.id = pi.productId
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
				    	'stock', stock
			  	) 
		  ) AS options 
		  FROM product_options po
		  LEFT JOIN size ON size.id = po.sizeId
	  	GROUP BY pcId
  	) AS productOption ON productOption.pcId = pc.id
  	GROUP BY p.id	
    ) AS oo ON oo.productId = p.id
    WHERE p.id = ${productId}
    GROUP BY p.id
    `);
  },
  async getProductPriceByOption(optionId: number) {
    return ProductRepository.query(`
      SELECT 
        name,
        price
      FROM product_options po
      LEFT JOIN product_color pc ON po.productColorId = pc.id
      LEFT JOIN product p ON pc.productId = p.id
      WHERE po.id = ${optionId}
    `);
  },
});
