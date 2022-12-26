import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order_status {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
}