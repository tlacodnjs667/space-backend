import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';
@Entity({ name: 'event_status' })
export class EventStatus {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 30, nullable: false })
  name: string;
  @OneToMany(() => Event, (event) => event.event_status)
  event: Event[];
}
