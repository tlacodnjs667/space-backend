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

@Entity()
export class MainSubCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 30 })
  name: string;
  @ManyToOne(
    () => MainCategories,
    (main_category: MainCategories) => main_category.id,
    {
      cascade: true,
      nullable: false,
    },
  )
  main_category_id: MainCategories;
  @ManyToOne(
    () => SubCategories,
    (sub_category: SubCategories) => sub_category.id,
    {
      cascade: true,
      nullable: false,
    },
  )
  sub_category: SubCategories;
  @OneToMany(() => Items, (item) => item.id)
  item: Items[];
}
