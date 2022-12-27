import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class ProductColor {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Product, (product) => product.id)
  product: number;
}
