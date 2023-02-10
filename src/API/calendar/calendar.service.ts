import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LaunchingCalendarRepository } from './calendar.repository';

@Injectable()
export class CalendarService {
  getCalendarList(offset: string) {
    return LaunchingCalendarRepository.getCalendarList(offset);
  }

  getCalendarDetail(calendar: string) {
    if (!calendar) {
      throw new HttpException('CANNOT_FIND_CALENDAR_ID', HttpStatus.NOT_FOUND);
    }
    return LaunchingCalendarRepository.getCalendarDetail(calendar);
  }
}
