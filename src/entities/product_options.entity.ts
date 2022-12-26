import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Size } from './size.entity';
import { ProductColor } from './product_color.entity';


@Entity()
export class Product_options {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('int')
  detail_size: number;
  @Column('int')
  stock: number;
  @ManyToOne(()=>ProductColor, (productColor)=>productColor.id)
  productColor: ProductColor[];
  @ManyToOne(()=>Size, (Size)=>Size.id)
  size: Size[];
  

  
}