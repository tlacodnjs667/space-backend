import { AppDataSource } from 'src/config/database-config';
import { Lookbook } from 'src/entities/lookbook.entity';
import { ILookbookForMain, ILookbookForMainDetail } from './ILookbook';

export const LookbookRepository = AppDataSource.getRepository(Lookbook).extend({
  getLookbookList(offset: number) {
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
  getLookbookDetail(lookbookId: string) {
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
  getLookbookForMain(): Promise<ILookbookForMain[]> {
    return LookbookRepository.query(`
		SELECT
			id AS lookbookId,
			title,
			sub_title AS subTitle,
			thumbnail
		FROM lookbooks
		ORDER BY id DESC
		LIMIT 5 OFFSET 0
	`);
  },
  getLookbookDetailForMain(
    lookbookId: number,
  ): Promise<ILookbookForMainDetail[]> {
    return LookbookRepository.query(`
		SELECT
			lookbooks.id AS lookbookId,
			title,
			sub_title AS subTitle,
			content,
			thumbnail,
			JSON_ARRAYAGG(li.image) AS images,
			relatedProduct.productInfo
		FROM lookbooks
		LEFT JOIN lookbook_images li ON li.lookbookId = lookbooks.id 
		LEFT JOIN (
			SELECT
				lp.lookbooksId,
				JSON_ARRAYAGG(
					JSON_OBJECT(
						'productId',productId,
						'productName',p.name,
						'price', price,
						'thumbnail', thumbnail
					)
				) AS productInfo
			FROM lookbook_product lp
			LEFT JOIN product p ON lp.productId = p.id
			GROUP BY lookbooksId
		) AS relatedProduct ON relatedProduct.lookbooksId = lookbooks.id
		WHERE lookbooks.id = ${lookbookId}
		ORDER BY lookbooks.id DESC
	`);
  },
});
