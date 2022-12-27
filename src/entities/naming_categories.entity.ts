import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MainCategories } from './main_categories.entity';

@Entity()
export class NamingCategories {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 30 })
  name: string;
  @ManyToOne(
    () => MainCategories,
    (main_category: MainCategories) => main_category.id,
    { cascade: true, nullable: false },
  )
  main_category: MainCategories;
}
