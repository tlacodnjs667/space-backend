import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 100 })
  name: string;
  @Column({ length: 100 })
  position: string;
}
