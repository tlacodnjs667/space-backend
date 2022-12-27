import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProducts } from './order_product.entity';
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
  @ManyToOne(() => User, (user) => user.id)
  user: User[];
  @ManyToOne(() => OrderStatus, (order_status) => order_status.id)
  order_status: OrderStatus;
  @OneToMany(() => OrderProducts, (order_product) => order_product.id)
  order_product: OrderProducts[];
}
