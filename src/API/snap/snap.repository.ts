import { AppDataSource } from 'src/config/database-config';
import { Snap } from 'src/entities/snap.entity';
import { ISnapForMain } from './snapInterface';

export const SnapRepository = AppDataSource.getRepository(Snap).extend({
  getSnapsForAdv(): Promise<ISnapForMain[]> {
    return SnapRepository.query(`
        SELECT
	        s.id AS snapId,
	        s.thumbnail,
	        hashtag,
	        i.name AS itemName,
	        p.name AS productName
        FROM snaps s
        LEFT JOIN product p ON s.productId = p.id
        LEFT JOIN items i ON i.id = s.id
        ORDER BY s.id DESC
        LIMIT 10 OFFSET 0
    `);
  },
});
