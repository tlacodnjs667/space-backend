import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order_status } from './order_status.entity';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  order_number: string;
  @Column('int')
  total_price: number;
  @ManyToOne(()=>User, (user)=>user.id)
  user: User[];
  @ManyToOne(()=>Order_status, (order_status)=>order_status.id)
  order_status: Order_status[];
}