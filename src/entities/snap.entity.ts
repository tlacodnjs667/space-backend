import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Admin } from './admin.entity';
import { Items } from './items.entity';
import { Product } from './products.entity';

@Entity({ name: 'snaps' })
export class Snap {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Admin, (admin) => admin.id)
  admin: Admin;
  @Column({ length: 40 })
  model_name: string;
  @Column({ type: 'int', nullable: false })
  model_height: number;
  @Column({ type: 'int', nullable: false })
  model_weight: number;
  @Column({ length: 50 })
  cloth_color: string;
  @Column({ length: 100 })
  cloth_size: string;
  @ManyToOne(() => Items, (item) => item.id)
  item: Items;
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;
}
