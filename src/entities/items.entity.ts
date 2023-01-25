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

@Entity({ name: 'items' })
export class Items {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 40, nullable: false })
  name: string;
  @ManyToOne(
    () => MainSubCategories,
    (main_sub_category) => main_sub_category.id,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  main_sub_category: MainSubCategories;
  @OneToMany(() => Product, (product) => product.item)
  products: Product[];
  @OneToMany(() => Snap, (snap) => snap.item)
  snaps: Snap[];
}
