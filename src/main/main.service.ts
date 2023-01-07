import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/config/data-source';
import { MainCategories } from 'src/entities/main_categories.entity';

@Injectable()
export class MainService {
  findCategories = async () => {
    const mainRepo = AppDataSource.getRepository(MainCategories);
    // const result = await mainRepo.query(`
    //       SELECT
    //         main.id,
    //         main.name AS title,
    //         JSON_ARRAYAGG(
    //           JSON_OBJECT(
    //               'id',naming.id,
    //              'name',naming.name
    //           )
    //         ) AS content,
    //         subContents.underContent
    //       FROM main_categories main
    //       LEFT JOIN naming_categories naming ON naming.main_id = main.id
    //       LEFT JOIN (
    //         SELECT
    //           mainSub.main_id,
    //           JSON_ARRAYAGG(
    //             JSON_OBJECT(
    //               'id',sub.id,
    //               'name',sub.name
    //             )
    //           ) AS underContent
    //         FROM main_sub_categories mainSub
    //         LEFT JOIN sub_categories sub ON mainSub.sub_id = sub.id
    //         GROUP BY mainSub.main_id
    //       ) AS subContents ON subContents.main_id = main.id
    //       GROUP BY main.id
    //     `);
    const result = await mainRepo.query(`
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
    return result;
  };
}
