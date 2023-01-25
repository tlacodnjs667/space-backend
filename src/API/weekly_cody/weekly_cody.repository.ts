import { AppDataSource } from 'src/config/database-config';
import { WeeklyCody } from 'src/entities/weekly_cody.entity';

export const WeeklyCodyRepository = AppDataSource.getRepository(
  WeeklyCody,
).extend({
  getweeklyCodyList: (style: string, offset: number) => {
    return WeeklyCodyRepository.query(`
	SELECT
		w.id,
		w.thumbnail,
		ws.id AS styleId,
		ws.name
	FROM weekly_cody w
	LEFT JOIN weekly_style ws ON w.weeklyStyleId = ws.id
	WHERE ws.id IN (${style})
	LIMIT 18 OFFSET ${offset}
  `);
  },
  getweeklyCodyDetail: (codyId: string) => {
    return WeeklyCodyRepository.query(`
	SELECT
		wc.id AS codyId,
		wc.thumbnail AS codyImage,
		ws.id AS styleId,
		ws.name AS styleNam,
		pp.tags,
		style.product
	FROM weekly_cody wc
	LEFT JOIN weekly_style ws ON wc.weeklyStyleId = ws.id
	LEFT JOIN(
		SELECT
		ct.weeklyCodyId,
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'hashId', h.id,
				'hashName', h.name
			)
		)AS tags
		FROM cody_tag ct
	LEFT JOIN hashtags h ON ct.hashtagsId = h.id
	GROUP BY ct.weeklyCodyId
	) AS pp ON pp.weeklyCodyId = wc.id  
	LEFT JOIN(
		SELECT 
		cp.weeklyCodyId,
		JSON_ARRAYAGG(
			JSON_OBJECT(
				p.id,
				p.thumbnail,
				p.name,
				p.price
			)
		)AS product
		FROM cody_product cp
	LEFT JOIN product p ON cp.productId = p.id
	GROUP BY cp.weeklyCodyId
	)AS style ON style.weeklyCodyId = ws.id
	WHERE wc.id = ${codyId}
	`);
  },
});
