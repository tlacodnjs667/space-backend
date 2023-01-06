import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MainSubCategories } from './main_sub_categories.entity';
import { NamingCategories } from './naming_categories.entity';

@Entity({ name: 'main_categories' })
export class MainCategories {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 40, nullable: false })
  name: string;
  @OneToMany(
    () => NamingCategories,
    (naming_category) => naming_category.main_category,
  )
  naming_categories: NamingCategories[];
  @OneToMany(
    () => MainSubCategories,
    (main_sub_category) => main_sub_category.main_category,
  )
  main_sub_categories: MainSubCategories[];
}
