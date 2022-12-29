import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LaunchingCalendar } from './launching_calendar.entity';
import { User } from './user.entity';
@Entity({ name: 'calendar_likes' })
export class CalendarLike {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => User, (user) => user.id, { nullable: false, cascade: true })
  user_id: User;
  @ManyToOne(
    () => LaunchingCalendar,
    (launching_calendar) => launching_calendar.id,
    { nullable: false, onDelete: 'CASCADE' },
  )
  launching_calendar: User;
}
