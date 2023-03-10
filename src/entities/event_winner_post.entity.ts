import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Admin } from './admin.entity';
@Entity({ name: 'event_winner_posts' })
export class EventWinnerPost {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 100, nullable: false })
  title: string;
  @Column({ length: 2000, nullable: false, type: 'varchar' })
  description: string;
  @CreateDateColumn({ nullable: false })
  created_at: Date;
  @Column({ type: 'int', nullable: false })
  seeing_count: number;
  @ManyToOne(() => Admin, (admin) => admin.event_winner_posts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  admin: Admin;
}
