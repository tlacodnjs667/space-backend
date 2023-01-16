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
});
