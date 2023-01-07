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
          	sc.subCate	
        FROM main_categories m
        LEFT JOIN (
	        SELECT
	        	ms.main_id AS mainId,
		        JSON_ARRAYAGG(
		        	JSON_OBJECT(
		    	    	'id', IFNULL(s.id, ''),
		    	    	'name', IFNULL(s.name, '')
		    	    )
        		) AS subCate
	        FROM main_sub_categories ms
	        LEFT JOIN sub_categories s ON ms.sub_id = s.id	
  	      GROUP BY mainId
          ) AS sc ON sc.mainId = m.id
        WHERE m.id = 2 OR m.id=3
        `);
  },
});
