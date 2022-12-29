import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderProducts } from './order_product.entity';

@Entity()
export class ShipmentStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
  @OneToMany(() => OrderProducts, (order_products) => order_products.id)
  order_products: OrderProducts[];
}
