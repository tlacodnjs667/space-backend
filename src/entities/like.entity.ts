import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';
import { User } from './user.entity';

@Entity()
export class ProductLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Product, (product) => product.id)
  product: number;
  @ManyToOne(() => User, (user) => user.id)
  user: number;
}
