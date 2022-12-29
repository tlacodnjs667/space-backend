import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './products.entity';
import { Snap } from './snap.entity';
import { SubCategories } from './sub_categories.entity';

@Entity({ name: 'items' })
export class Items {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 30, nullable: false })
  name: string;
  @ManyToOne(() => SubCategories, (sub_category) => sub_category.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  sub_category: SubCategories;
  @OneToMany(() => Product, (product) => product.id)
  product: Product[];
  @OneToMany(() => Snap, (snap) => snap.id)
  snap: Snap[];
}
