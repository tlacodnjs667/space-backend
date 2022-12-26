import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Admin } from './admin.entity';
import { Items } from './items.entity';
import { Product } from './products.entity';

@Entity()
export class Snap {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Admin, (admin) => admin.id)
  admin: Admin;
  @Column({ length: 40 })
  model_name: string;
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  model_height: number;
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
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
