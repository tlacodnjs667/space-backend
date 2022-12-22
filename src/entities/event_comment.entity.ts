import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class EventCalendar {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 1000 })
  content: string;
  @CreateDateColumn()
  created_at: Date;
  @ManyToOne(() => User, (user) => user.id, { nullable: true, cascade: false })
  user_id: User;
}
