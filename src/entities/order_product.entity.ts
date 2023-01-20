import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { ProductOptions } from './product_options.entity';
import { ShipmentStatus } from './shipment_status.entity';

@Entity({ name: 'order_products' })
export class OrderProducts {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', length: '100', nullable: false })
  shippingCompany: string;
  @Column({ type: 'varchar', length: '500', nullable: false })
  tracking_number: string;
  @ManyToOne(() => Order, (order) => order.order_products, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  order: Order;
  @ManyToOne(
    () => ShipmentStatus,
    (shipment_status) => shipment_status.order_products,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  shipment_status: ShipmentStatus;
  @ManyToOne(
    () => ProductOptions,
    (product_options) => product_options.order_products,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  product_option: ProductOptions;
}
