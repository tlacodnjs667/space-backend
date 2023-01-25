import {
  Column,
  Entity,
  Like,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Size } from './size.entity';
import { ProductColor } from './product_color.entity';
import { OrderProducts } from './order_product.entity';
import { Cart } from './cart.entity';
import { ProductLike } from './like.entity';

@Entity()
export class ProductOptions {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int', nullable: false, default: 15 })
  stock: number;
  @ManyToOne(() => ProductColor, (productColor) => productColor.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  productColor: ProductColor;
  @Column({ type: 'decimal', nullable: true, precision: 4, scale: 1 })
  top: number;
  @Column({ type: 'decimal', nullable: true, precision: 4, scale: 1 })
  chest: number;
  @Column({ type: 'decimal', nullable: true, precision: 4, scale: 1 })
  sleeve_length: number;
  @Column({ type: 'decimal', nullable: true, precision: 4, scale: 1 })
  shoulder: number;
  @Column({ type: 'decimal', nullable: true, precision: 4, scale: 1 })
  bottom: number;
  @Column({ type: 'decimal', nullable: true, precision: 4, scale: 1 })
  hem: number;
  @Column({ type: 'decimal', nullable: true, precision: 4, scale: 1 })
  waist_line: number;
  @Column({ type: 'decimal', nullable: true, precision: 4, scale: 1 })
  hip_line: number;
  @ManyToOne(() => Size, (Size) => Size.product_options)
  size: Size;
  @OneToMany(
    () => OrderProducts,
    (order_products) => order_products.product_option,
  )
  order_products: OrderProducts[];
  @OneToMany(() => Cart, (cart) => cart.product_option)
  carts: Cart[];
  @OneToMany(() => ProductLike, (like) => like.option)
  likes: ProductLike[];
  @ManyToOne(
    () => ProductColor,
    (product_color) => product_color.product_options,
  )
  product_color: ProductColor;
}
