import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { ProductOptions } from './product_options.entity';
import { ShipmentStatus } from './shipment_status.entity';

@Entity({ name: 'order_products' })
export class OrderProducts {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', nullable: false })
  shippingCompany: string;
  @Column({ type: 'varchar', nullable: false })
  tracking_number: string;
  @ManyToOne(() => Order, (order) => order.id, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: Order;
  @ManyToOne(() => ShipmentStatus, (shipment_status) => shipment_status.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  shipment_status: ShipmentStatus;
  @ManyToOne(() => ProductOptions, (product_options) => product_options.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  prodct_options: ProductOptions;
}
