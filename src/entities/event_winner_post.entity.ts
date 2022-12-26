import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Admin } from './admin.entity';
@Entity()
export class EventWinnerPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 100 })
  title: string;
  @Column({ length: 2000 })
  description: string;
  @CreateDateColumn()
  created_at: Date;
  @Column('int')
  seeing_count: number;
  @ManyToOne(() => Admin, (admin) => admin.id, {
    nullable: true,
    cascade: false,
  })
  admin: Admin;
}
