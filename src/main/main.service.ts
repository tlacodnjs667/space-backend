import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'src/config/data-source';
import { MainCategories } from 'src/entities/main_categories.entity';
// import { MainSubCategories } from 'src/entities/main_sub_categories.entity';
// import { SubCategories } from 'src/entities/sub_categories.entity';

@Injectable()
export class MainService {
  findCategories = async () => {
    const mainRepo = AppDataSource.getRepository(MainCategories);
    const result = await mainRepo
      .createQueryBuilder('main')
      .leftJoinAndSelect('main.naming_categories', 'naming')
      .getRawMany();

    console.log(result);

    // const result = await mainRepo.query(`
    //   SELECT DISTINCT
    //     main.id,
    //     main.name,
    //     DISTINCT JSON_ARRAYAGG(
    //        JSON_OBJECT('sub_id',sub.id,'sub_name',sub.name)
    //     ) AS subCategory,
    //     DISTINCT JSON_ARRAYAGG(
    //       JSON_OBJECT('naming_id',naming.id,'naming_name',naming.name)
    //     ) AS namingCategory
    //   FROM main_categories main
    //   LEFT JOIN main_sub_categories main_sub ON main.id = main_sub.main_id
    //   LEFT JOIN sub_categories sub ON sub.id=main_sub.sub_id
    //   LEFT JOIN naming_categories naming ON naming.main_id =main.id
    //   GROUP BY main.id
    // `);
    return result;
  };
}
