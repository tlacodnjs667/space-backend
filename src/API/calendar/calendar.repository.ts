import { AppDataSource } from 'src/config/database-config';
import { LaunchingCalendar } from 'src/entities/launching_calendar.entity';

export const LaunchingCalendarRepository = AppDataSource.getRepository(
  LaunchingCalendar,
).extend({
  getCalendarList: (offset: number) => {
    return LaunchingCalendarRepository.query(`
      SELECT
	      l.id,
      	l.title,
	      l.thumbnail
      FROM launching_calendars l
      LIMIT 6 OFFSET ${offset}
    `);
  },

  getCalendarDetail: (calendar: string) => {
    return LaunchingCalendarRepository.query(`
      SELECT
	      l.id,
	      l.title,
	      l.content,
	      l.image,
	      l.likeCounting
      FROM launching_calendars l
      where l.id = ${calendar}
    `);
  },
});
