import { Injectable } from '@nestjs/common';
import { LaunchingCalendarRepository } from './calendar.repository';
import { CartRepository } from '../cart/cart.repository';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';

@Injectable()
export class CalendarService {
  getCalendarList(offset: string) {
    return LaunchingCalendarRepository.getCalendarList(offset);
  }

  getCalendarDetail(calendar: string) {
    return LaunchingCalendarRepository.getCalendarDetail(calendar);
  }
}
