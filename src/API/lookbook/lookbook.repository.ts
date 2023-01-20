import { AppDataSource } from 'src/config/database-config';
import { Lookbook } from 'src/entities/lookbook.entity';

export const LookbookRepository = AppDataSource.getRepository(Lookbook).extend({
  getLookbookList: (offset: number) => {
    return LookbookRepository.query(`
    SELECT
      lb.id,
	    lb.title,
      lb.sub_title,
	    lb.thumbnail
    FROM lookbooks lb
    LIMIT 8 OFFSET ${offset}
  `);
  },
  getLookbookDetail: (lookbookId: string) => {
    return LookbookRepository.query(`
      SELECT 
	      lb.id,
	      lb.title,
      	lb.sub_title,
	      lb.content,
	      lb.thumbnail,
	      products.lookbook
      FROM lookbooks lb
      left JOIN(
	      SELECT
		      lp.lookbooksId,
		        JSON_ARRAYAGG(
		        	JSON_OBJECT(
				        'productId',p.id,
				        'image',p.thumbnail,
				        'productName',p.name,
				        'price',p.price
			        )
		      ) AS lookbook
	    FROM lookbook_product lp
    	LEFT JOIN product p ON p.id = lp.productId
	    GROUP BY lp.lookbooksId
      ) AS products ON products.lookbooksId = lb.id
      where lb.id = ${lookbookId}
    `);
  },
});
