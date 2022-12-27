import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LaunchingCalendar } from './launching_calendar.entity';
import { User } from './user.entity';
@Entity()
export class CalendarComment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 500 })
  comment: string;
  @ManyToOne(() => LaunchingCalendar, (calendar) => calendar.id, {
    nullable: true,
    cascade: false,
  })
  calendar_id: LaunchingCalendar;
  @ManyToOne(() => User, (user) => user.id, { nullable: true, cascade: false })
  user_id: User;
}
