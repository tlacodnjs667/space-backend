import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MainCategories } from './main_categories.entity';

@Entity()
export class NamingCategories {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 30, nullable: false })
  name: string;
  @ManyToOne(
    () => MainCategories,
    (main_category: MainCategories) => main_category.id,
    { nullable: false, onDelete: 'CASCADE' },
  )
  main_category: MainCategories;
}
