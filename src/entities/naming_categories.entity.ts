import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MainCategories } from './main_categories.entity';

@Entity({ name: 'naming_categories' })
export class NamingCategories {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 40, nullable: false })
  name: string;
  @ManyToOne(
    () => MainCategories,
    (main_category: MainCategories) => main_category.naming_categories,
    { nullable: false, onDelete: 'CASCADE' },
  )
  main_category: MainCategories;
}
