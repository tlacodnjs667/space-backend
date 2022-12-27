import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from './order_status.entity';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  order_number: string;
  @Column('int')
  total_price: number;
  @ManyToOne(()=>User, (user)=>user.id)
  user: User[];
  @ManyToOne(()=>OrderStatus, (orderStatus)=>orderStatus.id)
  orderStatus: OrderStatus[];
}