import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SubCategories } from './sub_categories.entity';
import { MainCategories } from './main_categories.entity';
import { Items } from './items.entity';

@Entity({ name: 'main_sub_categories' })
export class MainSubCategories {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 30, nullable: false })
  name: string;
  @ManyToOne(
    () => MainCategories,
    (main_category: MainCategories) => main_category.id,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  main_category_id: MainCategories;
  @ManyToOne(
    () => SubCategories,
    (sub_category: SubCategories) => sub_category.id,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  sub_category: SubCategories;
  @OneToMany(() => Items, (item) => item.id)
  item: Items[];
}
