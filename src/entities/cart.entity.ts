import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductOptions } from './product_options.entity';
import { User } from './user.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => User, (user) => user.carts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
  @ManyToOne(() => ProductOptions, (product_option) => product_option.carts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  product_option: ProductOptions;
  @Column({ type: 'int', nullable: false })
  quantity: number;
}
