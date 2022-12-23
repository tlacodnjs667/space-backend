import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';

@Entity()
export class EventComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 1000 })
  content: string;
  @CreateDateColumn()
  created_at: Date;
  @ManyToOne(() => User, (user) => user.id, { nullable: true, cascade: false })
  user_id: User;
  @ManyToOne(() => Event, (event) => event.id, {
    nullable: true,
    cascade: false,
  })
  event_id: Event;
}
