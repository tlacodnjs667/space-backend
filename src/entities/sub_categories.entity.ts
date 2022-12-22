import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MainCategories } from './main_categories.entity';

@Entity()
export class SubCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 30 })
  name: string;
  @ManyToMany(() => MainCategories, (sub_category) => sub_category.id)
  sub_categories: MainCategories[];
}
