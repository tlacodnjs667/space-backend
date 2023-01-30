import { Injectable } from '@nestjs/common';
import { LaunchingCalendarRepository } from './calendar.repository';

@Injectable()
export class CalendarService {
  getCalendarList(offset: string) {
    return LaunchingCalendarRepository.getCalendarList(offset);
  }

  getCalendarDetail(calendar: string) {
    return LaunchingCalendarRepository.getCalendarDetail(calendar);
  }
}
