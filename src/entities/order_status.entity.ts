import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  name: string;
}