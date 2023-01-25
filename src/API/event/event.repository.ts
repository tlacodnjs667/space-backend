import { AppDataSource } from 'src/config/database-config';
import { Event } from 'src/entities/event.entity';

export const EventRepository = AppDataSource.getRepository(Event).extend({
  getEventList: (eventStatusId: string) => {
    return EventRepository.query(`
    SELECT
      e.id,
      e.title,
      e.thumbnail
    FROM events e
    LEFT JOIN event_status es ON e.eventStatusId = e.id
    WHERE eventStatusId = ${eventStatusId}
    `);
  },

  getEventDetail: (eventId: string) => {
    return EventRepository.query(`
    SELECT
	    e.id,
	    e.title,
	    e.thumbnail,
	    e.content,
	    e.start_date,
	    e.end_date
    FROM events e
    LEFT JOIN event_status es ON e.eventStatusId = e.id
    WHERE e.id = ${eventId}
    `);
  },

  getEventWinnerList: () => {
    return EventRepository.query(`
    SELECT
      ew.id,
      ew.title,
      ew.created_at,
      ew.seeing_count
    FROM event_winner_posts ew
    `);
  },

  getEventWinner: (id: string) => {
    return EventRepository.query(`
    SELECT
      ew.id,
      ew.title,
      ew.description,
      ew.created_at,
      ew.seeing_count
    FROM event_winner_posts ew
    WHERE ew.id = ${id}
    `);
  },
});
