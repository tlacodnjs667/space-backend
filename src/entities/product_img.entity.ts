import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Product)
  product: number;
  @Column({ length: 1000 })
  img_url: string;
}
