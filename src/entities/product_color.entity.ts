import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Color } from './color.entity';
import { Product } from './products.entity';
import { ProductOptions } from './product_options.entity';

@Entity({ name: 'product_color' })
export class ProductColor {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Product, (product) => product.id)
  product: number;
  @ManyToOne(() => Color, (color) => color.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  color: Color;
  @OneToMany(() => ProductOptions, (product_option) => product_option.id)
  product_option: ProductOptions[];
}
