import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';
@Entity()
export class EventStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 40 })
  name: string;
  @OneToMany(() => Event, (event) => event.id)
  event: Event[];
}
