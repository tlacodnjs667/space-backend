import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductColor } from './product_color.entity';

@Entity({ name: 'colors' })
export class Color {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 50, nullable: false })
  fff: string;
  @OneToMany(() => ProductColor, (product_color) => product_color.color)
  product_colors: ProductColor[];
}
