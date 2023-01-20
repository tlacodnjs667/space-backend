import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { User } from './user.entity';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 100, type: 'varchar', nullable: false })
  address_name: string;
  @Column({ length: 200, type: 'varchar', nullable: false })
  address: string;
  @Column({ length: 100, type: 'varchar', nullable: false })
  detail_address: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  phone: string;
  @OneToOne(() => Order, (order) => order.shipment)
  order: Order;
  @OneToOne(() => User, (user) => user.shipment)
  user: User;
}
