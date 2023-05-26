import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';
import { ProductOptions } from './product_options.entity';
import { User } from './user.entity';

@Entity({ name: 'likes' })
export class ProductLike {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => Product, (product) => product.product_likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  product: Product;
  @ManyToOne(() => ProductOptions, (option) => option.likes, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  option: ProductOptions;
  @ManyToOne(() => User, (user) => user.product_likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
}
