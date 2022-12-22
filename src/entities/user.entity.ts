import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 30 })
  name: string;
  @Column({ length: 200 })
  description: string;
  @Column({ length: 30 })
  status: string;
}
