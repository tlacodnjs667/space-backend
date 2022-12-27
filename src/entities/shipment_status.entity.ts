import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderProducts } from './order_product.entity';

@Entity()
export class ShipmentStatus {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('varchar')
    name: string;
    @OneToMany(() => OrderProducts, (shipment) => shipment.id)
    shipment: OrderProducts[];
}
