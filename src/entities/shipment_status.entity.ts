import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderProducts } from './order_product.entity';

@Entity({ name: 'shipment_status' })
export class ShipmentStatus {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', nullable: false, length: '40' })
  name: string;
  @OneToMany(
    () => OrderProducts,
    (order_products) => order_products.shipment_status,
  )
  order_products: OrderProducts[];
}
