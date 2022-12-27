import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 200 })
  name: string;
}
