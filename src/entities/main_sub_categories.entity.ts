import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { SubCategories } from './sub_categories.entity';
import { MainCategories } from './main_categories.entity';
import { Items } from './items.entity';

@Entity({ name: 'main_sub_categories' })
export class MainSubCategories {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(
    () => MainCategories,
    (main_category) => main_category.main_sub_categories,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  main_category: MainCategories;
  @ManyToOne(
    () => SubCategories,
    (sub_category) => sub_category.main_sub_category,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  sub_category: SubCategories;
  @OneToMany(() => Items, (item) => item.main_sub_category)
  item: Items[];
}
