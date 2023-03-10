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
  @Column({ type: 'varchar', length: 1000, nullable: false })
  comment: string;
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;
  @ManyToOne(() => User, (user) => user.event_comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
  @ManyToOne(() => Event, (event) => event.event_comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  event: Event;
}
