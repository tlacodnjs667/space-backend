import { AppDataSource } from 'src/config/database-config';
import { Product } from 'src/entities/products.entity';
import { ILikeInter } from './IProductIn';

export const ProductRepository = AppDataSource.getRepository(Product).extend({
  getCategory: () => {
    return ProductRepository.query(`
      SELECT
        id, 
        name
      FROM main_categories
      WHERE id IN (2,3,4)
    `);
  },

  getWeeklyBestByCategory: (obj: ILikeInter, category: number) => {
    return ProductRepository.query(`
        SELECT
        	  p.id, 
            p.name, 
            p.thumbnail, 
            p.price, 
            c.productColor,
            COUNT(r.id) AS review,
            AVG(star) AS point,
            options.stockCheck
            ${obj.columnDefinitionForLikeCheck}
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
        LEFT JOIN (
          SELECT
              pc.productId,
              JSON_ARRAYAGG(
                JSON_OBJECT(
                  'colorId',pc.colorId,
                  'colorName',c.name,
                  'opt', opt.opt
                )
              )	AS stockCheck
            FROM product_color pc
            LEFT JOIN colors c ON pc.colorId = c.id
            LEFT JOIN (
              SELECT 
                po.productColorId,
                JSON_ARRAYAGG(JSON_OBJECT(
                  'sizeId', po.sizeId,
                  'sizeName', s.name,
                  'stock', po.stock
                ) )AS opt
              FROM product_options po
              LEFT JOIN size s ON po.sizeId = s.id
              GROUP BY productColorId
            ) AS opt ON opt.productColorId = pc.id
            GROUP BY productId
          ) AS options ON options.productId = p.id
          ${obj.joinQueryForLikeCheck}
        WHERE mainCategoryId = ${category ? category : 2}
        GROUP BY p.id, c.productColor, options.stockCheck${
          obj.columnDefinitionForLikeCheck
        }
        ORDER BY review DESC, point DESC
        LIMIT 8 OFFSET 0
    `);
  },
  getNewProduct: (obj: ILikeInter) => {
    return ProductRepository.query(`
      SELECT
          p.id, 
          p.name, 
          p.thumbnail, 
          p.price, 
          c.productColor,
          p.created_at,
          COUNT(r.id) AS review,
          options.stockCheck
          ${obj.columnDefinitionForLikeCheck}
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
      LEFT JOIN (
        SELECT
          pc.productId,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'colorId',pc.colorId,
              'colorName',c.name,
              'opt', opt.opt
            )
          )	AS stockCheck
        FROM product_color pc
        LEFT JOIN colors c ON pc.colorId = c.id
        LEFT JOIN (
          SELECT 
            po.productColorId,
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'sizeId', po.sizeId,
                'sizeName', s.name,
                'stock', po.stock
              ) 
            )AS opt
          FROM product_options po
          LEFT JOIN size s ON po.sizeId = s.id
          GROUP BY productColorId
        ) AS opt ON opt.productColorId = pc.id
          GROUP BY productId
        ) AS options ON options.productId = p.id
        ${obj.joinQueryForLikeCheck}
      GROUP BY p.id, c.productColor, options.stockCheck${obj.columnDefinitionForLikeCheck}
      ORDER BY p.created_at DESC
      LIMIT 11 OFFSET 0
    `);
  },
  getProductList: (
    whereQuery: string,
    orderQuery: string,
    offset: number,
    userId: string,
  ) => {
    return ProductRepository.query(`
      SELECT DISTINCT
        p.id,
        p.name AS name,
        p.thumbnail,
        p.price AS price,
        p.created_at AS news,
        ppp.likeId,
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
          l.productId,
          l.productId AS likeid
        FROM likes l 
        ${userId}
        GROUP BY l.productId
      ) AS ppp ON ppp.productId = p.id
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
  ) AS reviewss ON reviewss.productId = p.id
  ${whereQuery}
  GROUP BY p.id , orderss.orderCount, reviewss.reviewCount
  ${orderQuery}
  LIMIT 14 OFFSET ${offset}
	`);
  },
  getCountOrder: (left: string, colorsQuery: string, itemQuery: string) => {
    return ProductRepository.query(`
      SELECT
        COUNT(p.id)
      FROM product p
      LEFT JOIN items i ON p.itemId = i.id
      LEFT JOIN main_sub_categories ms ON ms.id = i.mainSubCategoryId
      LEFT JOIN (
        SELECT 
          p.id,
          JSON_ARRAYAGG(productId)
        FROM product p
        JOIN product_color pc ON p.id = pc.productId
        ${colorsQuery}
        GROUP BY p.id
      ) AS aaa ON aaa.id = p.id
      ${itemQuery}
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
        p.description,
        p.price, 	
        ppp.likeid,
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
            l.productId,
            l.id AS likeid
          FROM likes l 
          GROUP BY l.productId, l.id
        ) AS ppp ON ppp.productId = p.id
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
    GROUP BY p.id,ppp.likeid
    `);
  },
  getProductPriceByOption: async (optionId: number) => {
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
  getRecommendReview: (offset: number) => {
    return ProductRepository.query(`
    SELECT DISTINCT
      p.id,
      p.name,
      p.thumbnail,
      p.price,
      AVG(r.star) AS star,
      COUNT(r.id) AS reviewCount,
      JSON_OBJECT(
    	  'reviewId', reviewInfo.reviewId,
    	  'content', reviewInfo.content,
    	  'image', reviewInfo.thumbnail,
    	  'star', reviewInfo.star
      ) AS reviewInform,
    ranking
    FROM product p
    LEFT JOIN review r ON r.productId = p.id
    LEFT JOIN (
  	  SELECT
  		  *
  	  FROM (
  		  SELECT
  			  r.productId,
	  		  r.id AS reviewId,
	  		  r.content,
	  		  r.thumbnail,
	  		  r.star,
	  		  RANK() OVER (PARTITION BY r.productId ORDER BY r.star, r.id ASC) AS ranking
	  	  FROM review r
	  ) AS reviewInfo
	  HAVING ranking <= 1
    ) AS reviewInfo ON reviewInfo.productId = p.id
    GROUP by p.id, reviewInform
    ORDER BY star DESC 
    LIMIT 4 OFFSET ${offset}
    `);
  },

  getProductSearch: () => {
    return ProductRepository.query(`
      SELECT 
		    r.id AS reviewId,
		    r.star,
		    aa.product
      FROM review r
      left JOIN(
	      SELECT DISTINCT
		      p.id,
		      JSON_ARRAYAGG(
			      JSON_OBJECT(
				      'productId', p.id,
				      'productName', p.name,
				      'productImage', p.thumbnail,
				      'price', p.price
			      )
		      ) AS product
	      FROM product p
	      GROUP BY p.id
      ) AS aa ON aa.id = r.productId
      ORDER BY r.star DESC
      LIMIT 3 OFFSET 0
    `);
  },
});
