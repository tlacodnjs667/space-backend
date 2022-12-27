import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity' 
import { OrderStatus } from './order_status.entity';
import { Product_options } from './product_options.entity';

@Entity()
export class OrderProducts {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  company: string;
  @Column('varchar')
  tracking_number: string;
  @ManyToOne(()=>Order, (order)=>order.id)
  order: Order[];
  @ManyToOne(()=>OrderStatus, (orderStatus)=>orderStatus.id)
  orderStatus: OrderStatus[];
  @ManyToOne(()=>Product_options, (product_options)=>product_options.id)
  prodct_options: Product_options[];
}