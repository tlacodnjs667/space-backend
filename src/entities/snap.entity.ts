import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Admin } from './admin.entity';
import { Items } from './items.entity';
import { Product } from './products.entity';

@Entity({ name: 'snaps' })
export class Snap {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => Admin, (admin) => admin.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  admin: Admin;
  @Column({ length: 40, nullable: false })
  model_name: string;
  @Column({ type: 'int', nullable: false })
  model_height: number;
  @Column({ type: 'int', nullable: false })
  model_weight: number;
  @Column({ length: 50, nullable: false })
  cloth_color: string;
  @Column({ length: 100, nullable: false })
  cloth_size: string;
  @ManyToOne(() => Items, (item) => item.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  item: Items;
  @ManyToOne(() => Product, (product) => product.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  product: Product;
}
