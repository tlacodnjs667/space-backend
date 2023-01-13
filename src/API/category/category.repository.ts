import { AppDataSource } from 'src/config/data-source';
import { MainCategories } from 'src/entities/main_categories.entity';

export const CategoryRepository = AppDataSource.getRepository(
  MainCategories,
).extend({
  findCategories() {
    return CategoryRepository.query(`
		SELECT
			m.id,
			m.name,
			sc.subCategories,
			naming.namingCategoies
		FROM main_categories m
		LEFT JOIN (
		  SELECT
			  ms.mainCategoryId,
			  JSON_ARRAYAGG(
				  JSON_OBJECT(
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
		      `);
  },
});
