import { AppDataSource } from 'src/config/database-config';
import { Snap } from 'src/entities/snap.entity';

export const SnapRepository = AppDataSource.getRepository(Snap).extend({
  getSnapList: async (hashtag: string) => {
    return SnapRepository.query(`
    SELECT
		id,
		model_name AS modelName,
		model_height AS height,
		cloth_color AS color,
		cloth_size	AS size,
		thumbnail,
		hashtag
	FROM snaps 
	WHERE hashtag = ${hashtag}
  `);
  },
  getCountSnap: async (hashtag: string) => {
    return SnapRepository.query(`
	SELECT
		COUNT(hashtag)
  	FROM snaps 
 	WHERE hashtag = ${hashtag}
	`);
  },
  getSnapDetail: async (snapId: string) => {
    return SnapRepository.query(`
	SELECT
		s.id,
		model_name AS modelName,
		model_height AS height,
		model_weight AS weight,
		cloth_color AS color,
		cloth_size	AS size,
		s.thumbnail,
		hashtag,
		p.id,
		p.name,
		p.thumbnail AS productImage
	FROM snaps s
	LEFT JOIN product p ON s.productId = p.id
	WHERE s.id = ${snapId}
	`);
  },
});
