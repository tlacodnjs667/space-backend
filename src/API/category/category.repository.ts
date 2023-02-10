import { AppDataSource } from 'src/config/database-config';
import { MainCategories } from 'src/entities/main_categories.entity';

export const CategoryRepository = AppDataSource.getRepository(
  MainCategories,
).extend({
  findCategories() {
    return CategoryRepository.query(`
		SELECT
			m.id,
			m.name AS name,
			path,
			sc.subCategories,
			naming.namingCategoies,
			JSON_ARRAYAGG(productInfo) AS productInfo
		FROM main_categories m
		LEFT JOIN (
		  SELECT
			  ms.mainCategoryId,
			  JSON_ARRAYAGG(
				  JSON_OBJECT(
						'msId', IFNULL(mainCategoryId, ''),
						'id', IFNULL(s.id, ''),
						'name', IFNULL(s.name, '')
				  )
			  ) AS subCategories
		  FROM main_sub_categories ms
		  LEFT JOIN sub_categories s ON ms.subCategoryId = s.id
		  GROUP BY mainCategoryId
		) AS sc ON sc.mainCategoryId = m.id
		LEFT JOIN (
		  SELECT
			  mainCategoryId,
			  JSON_ARRAYAGG(
				  JSON_OBJECT(
					  'namingId',naming.id,
					  'namingName', naming.name
					  )
			  ) AS namingCategoies
		  FROM naming_categories naming
		  GROUP BY mainCategoryId
		) AS naming ON naming.mainCategoryId = m.id
		LEFT JOIN(
			SELECT
				*
			FROM (
					SELECT 
						ms.mainCategoryId,
						JSON_OBJECT(
							'productName', p.name,
							'productId', p.id,
							'thumbnail', thumbnail,
							'price', price 
						) AS productInfo,
						RANK() OVER (PARTITION BY mainCategoryId ORDER BY COUNT(op.id) DESC, p.id ASC) AS ranking
					FROM main_sub_categories ms  
					LEFT JOIN items i ON i.mainSubCategoryId = ms.id
					LEFT JOIN product p ON p.itemId = i.id 
					LEFT JOIN product_color pc ON pc.productId = p.id
					LEFT JOIN product_options po ON po.productColorId = pc.id 
					LEFT JOIN order_products op ON po.id = op.productOptionId
					GROUP BY productInfo, mainCategoryId, p.id
				) AS productRank
				HAVING ranking <= 3
		) AS prodRec ON prodRec.mainCategoryId = m.id
		GROUP BY m.id, m.name, sc.subCategories, naming.namingCategoies
	`);
  },
});
