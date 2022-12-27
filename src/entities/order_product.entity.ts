import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { ProductOptions } from './product_options.entity';
import { ShipmentStatus } from './shipment_status.entity';

@Entity()
export class OrderProducts {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  company: string;
  @Column('varchar')
  tracking_number: string;
  @ManyToOne(() => Order, (order) => order.id)
  order: Order;
  @ManyToOne(() => ShipmentStatus, (shipment_status) => shipment_status.id)
  shipment_status: ShipmentStatus;
  @ManyToOne(() => ProductOptions, (product_options) => product_options.id)
  prodct_options: ProductOptions;
}
