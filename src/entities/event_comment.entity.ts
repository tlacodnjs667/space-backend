import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';

@Entity({ name: 'event_comments' })
export class EventComment {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 1000, nullable: false })
  content: string;
  @CreateDateColumn({ nullable: false })
  created_at: Date;
  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user_id: User;
  @ManyToOne(() => Event, (event) => event.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  event_id: Event;
}
