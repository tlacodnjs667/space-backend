import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity' 
import { Order_status } from './order_status.entity';
import { Product_options } from './product_options.entity';

@Entity()
export class Order_products {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  company: string;
  @Column('varchar')
  tracking_number: string;
  @ManyToOne(()=>Order, (order)=>order.id)
  order: Order[];
  @ManyToOne(()=>Order_status, (order_status)=>order_status.id)
  order_status: Order_status[];
  @ManyToOne(()=>Product_options, (product_options)=>product_options.id)
  prodct_options: Product_options[];
}