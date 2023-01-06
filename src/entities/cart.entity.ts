import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';
import { User } from './user.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => User, (user) => user.cart, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
  @ManyToOne(() => Product, (product) => product.cart, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  product: Product;
}
