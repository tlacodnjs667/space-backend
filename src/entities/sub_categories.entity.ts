import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MainSubCategories } from './main_sub_categories.entity';

@Entity({ name: 'sub_categories' })
export class SubCategories {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 40, nullable: false })
  name: string;
  @OneToMany(
    () => MainSubCategories,
    (main_sub_category) => main_sub_category.id,
  )
  main_sub_category: MainSubCategories[];
}
