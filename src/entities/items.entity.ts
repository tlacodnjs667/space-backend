import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MainSubCategories } from './main_sub_categories.entity';
import { Product } from './products.entity';
import { Snap } from './snap.entity';

@Entity()
export class Items {
  @PrimaryGeneratedColumn()
  id: number;
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
  @OneToMany(() => Snap, (snap) => snap.id)
  snap: Snap[];
}
