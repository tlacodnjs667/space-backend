import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

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
  @ManyToOne(() => Order, (order) => order.shipments, { nullable: false })
  order: Order[];
}
