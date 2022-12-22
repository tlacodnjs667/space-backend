import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MainCategories } from './main_categories.entity';

@Entity()
export class NamingCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToOne(() => MainCategories, (main_category) => main_category.id)
  main_category_id: MainCategories;
}
