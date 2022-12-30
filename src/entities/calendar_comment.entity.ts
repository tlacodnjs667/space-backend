import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LaunchingCalendar } from './launching_calendar.entity';
import { User } from './user.entity';
@Entity({ name: 'calendar_comments' })
export class CalendarComment {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 500, nullable: false })
  comment: string;
  @ManyToOne(() => LaunchingCalendar, (calendar) => calendar.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  calendar: LaunchingCalendar;
  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
}
