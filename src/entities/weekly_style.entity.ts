import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WeeklyStyle {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 100 })
  name: string;
}
