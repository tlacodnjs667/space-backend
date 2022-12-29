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

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => Admin, (admin) => admin.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  admin_id: Admin[];
  @CreateDateColumn()
  created_at: Date;
  @Column({ length: 200, nullable: false })
  title: string;
  @Column({ length: 1000, nullable: false })
  content: string;
  @Column({ length: 1000, nullable: true })
  thumbnail: string;
  @Column({ length: 1000, nullable: true })
  template: string;
  @OneToMany(() => EventStatus, (event_status) => event_status.id)
  event_status: EventStatus[];
  @Column('datetime')
  start_date: Date;
  @Column('datetime')
  end_date: Date;
}
