import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MainSubCategories } from './main_sub_categories.entity';
import { NamingCategories } from './naming_categories.entity';

@Entity()
export class MainCategories {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 30 })
  name: string;
  @OneToMany(() => NamingCategories, (naming_category) => naming_category.id)
  naming_category: NamingCategories[];
  @OneToMany(
    () => MainSubCategories,
    (main_sub_category) => main_sub_category.id,
  )
  main_sub_category: MainSubCategories[];
}
