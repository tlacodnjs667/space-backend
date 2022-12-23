import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShipmentStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
  @OneToMany(()=>Shipment, (shipment)=>shipment.id)
  shipment: Shipment[];
}

//완성 안됨
