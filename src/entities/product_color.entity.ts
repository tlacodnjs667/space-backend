import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Color } from './color.entity';
import { Product } from './products.entity';
import { ProductOptions } from './product_options.entity';

@Entity({ name: 'product_color' })
export class ProductColor {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => Product, (product) => product.product_colors)
  product: number;
  @ManyToOne(() => Color, (color) => color.product_colors, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  color: Color;
  @OneToMany(
    () => ProductOptions,
    (product_option) => product_option.product_color,
  )
  product_options: ProductOptions[];
}
