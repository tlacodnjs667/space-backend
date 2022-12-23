import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Admin } from './admin.entity';
import { EventStatus } from './event_status.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Admin, (admin) => admin.id, {
    nullable: true,
    cascade: false,
  })
  admin_id: Admin[];
  @CreateDateColumn()
  created_at: Date;
  @Column({ length: 200 })
  title: string;
  @Column({ length: 1000 })
  content: string;
  @Column({ length: 1000 })
  thumbnail: string;
  @Column({ length: 1000 })
  template: string;
  @OneToMany(() => EventStatus, (event_status) => event_status.id)
  event_status: EventStatus[];
  @Column('datetime')
  start_date: Date;
  @Column('datetime')
  end_date: Date;
}
