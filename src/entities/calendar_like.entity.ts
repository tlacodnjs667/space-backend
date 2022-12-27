import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LaunchingCalendar } from './launching_calendar.entity';
import { User } from './user.entity';
@Entity()
export class CalendarLike {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.id, { nullable: true, cascade: false })
  user_id: User;
  @ManyToOne(
    () => LaunchingCalendar,
    (launching_calendar) => launching_calendar.id,
    { nullable: true, cascade: false },
  )
  launching_calendar: User;
}
