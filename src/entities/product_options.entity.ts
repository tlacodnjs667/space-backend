import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Size } from './size.entity';


@Entity()
export class Product_options {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('int')
  detail_size: number;
  @Column('int')
  stock: number;
  @ManyToOne(()=>Product_colors, (product_colors)=>product_color.id)
  product_colors: Product_colors[];
  @ManyToOne(()=>Size, (Size)=>Size.id)
  size: Size[];
  

  
}