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

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 500, nullable: false })
  order_number: string;
  @Column({ type: 'int', nullable: false })
  total_price: number;
  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  user: User;
  @ManyToOne(() => OrderStatus, (order_status) => order_status.id, {
    nullable: false,
  })
  order_status: OrderStatus;
  @OneToMany(() => OrderProducts, (order_product) => order_product.id)
  order_product: OrderProducts[];
}
