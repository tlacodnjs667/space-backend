import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Size {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 200 })
  name: string;
}
