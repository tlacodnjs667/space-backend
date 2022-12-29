import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  addresse_name: string;
  @Column('varchar')
  address: string;
  @Column('varchar')
  detail_address: string;
  @ManyToOne(() => Order, (order) => order.id)
  order: Order[];
}
