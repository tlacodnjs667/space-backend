import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MainSubCategories } from './main_sub_categories.entity';
import { Product } from './products.entity';

@Entity()
export class Items {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 30 })
  name: string;
  @ManyToOne(
    () => MainSubCategories,
    (main_sub_category) => main_sub_category.id,
    { nullable: false },
  )
  main_sub_category: MainSubCategories;
  @OneToMany(() => Product, (product) => product.id)
  product: Product[];
}
