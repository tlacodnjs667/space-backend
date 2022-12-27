import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  name: string;
}