import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => Product)
  product: number;
  @Column({ length: 1000,  nullable: false})
  img_url: string;
}
