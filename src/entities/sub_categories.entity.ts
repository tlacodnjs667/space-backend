import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MainSubCategories } from './main_sub_categories.entity';

@Entity()
export class SubCategories {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 30 })
  name: string;
  @OneToMany(
    () => MainSubCategories,
    (main_sub_category) => main_sub_category.id,
  )
  main_sub_category: MainSubCategories[];
}
