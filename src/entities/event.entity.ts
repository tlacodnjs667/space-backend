import { timeStamp } from 'console';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Admin } from './admin.entity';
import { EventStatus } from './event_status.entity';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => Admin, (admin) => admin.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  admin_id: Admin[];
  @CreateDateColumn({type: 'timestamp'})
  created_at: Date;
  @Column({ length: 200, nullable: false })
  title: string;
  @Column({ length: 1000, nullable: false })
  content: string;
  @Column({ length: 1000, nullable: true })
  thumbnail: string;
  @Column({ length: 1000, nullable: true })
  template: string;
  @ManyToOne(() => EventStatus, (event_status) => event_status.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  event_status: EventStatus;
  @Column('datetime')
  start_date: Date;
  @Column('datetime')
  end_date: Date;
}
