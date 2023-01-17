import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Admin } from './admin.entity';
import { CalendarComment } from './calendar_comment.entity';
import { CalendarLike } from './calendar_like.entity';

@Entity({ name: 'launching_Calendars' })
export class LaunchingCalendar {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 300, nullable: false, type: 'varchar' })
  title: string;
  @Column({ length: 300, nullable: false, type: 'varchar' })
  email: string;
  @Column({ length: 1000, nullable: false, type: 'varchar' })
  thumbnail: string;
  @Column({ length: 1000, nullable: false, type: 'varchar' })
  content: string;
  @Column({ length: 1000, nullable: true, type: 'varchar' })
  image: string;
  @Column({ type: 'int', default: 0 })
  likeCounting: number;
  @ManyToOne(() => Admin, (admin) => admin.lookbooks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  admin: Admin;
  @OneToMany(
    () => CalendarComment,
    (calendar_comments) => calendar_comments.calendar,
  )
  calendar_comments: CalendarComment[];
  @OneToMany(
    () => CalendarLike,
    (calendar_likes) => calendar_likes.launching_calendar,
  )
  calendar_likes: CalendarComment[];
}
