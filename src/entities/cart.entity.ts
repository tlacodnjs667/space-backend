import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';
import { User } from './user.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  user: User;
  @ManyToOne(() => Product, (product) => product.id, { cascade: true })
  product: Product;
}
