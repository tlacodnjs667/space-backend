import { AppDataSource } from 'src/config/data-source';
import { MainCategories } from '../../entities/main_categories.entity';

export const MainCategoryRepository = AppDataSource.getRepository(
  MainCategories,
).extend({
  findCategoryStructure: async () => {
    return await AppDataSource.getRepository(MainCategories).find();
  },
});
