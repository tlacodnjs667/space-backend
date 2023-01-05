import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Size } from './size.entity';
import { ProductColor } from './product_color.entity';

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
  @ManyToOne(() => Size, (Size) => Size.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  size: Size;
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
}
