import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';
@Entity({ name: 'event_status' })
export class EventStatus {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 40, nullable: false })
  name: string;
  @OneToMany(() => Event, (event) => event.id)
  event: Event[];
}
