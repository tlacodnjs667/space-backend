import { Controller, Get, Param, Query } from '@nestjs/common';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  getCalendarList(@Query('offset') offset: string) {
    return this.calendarService.getCalendarList(offset);
  }

  @Get('detail/:calendarId')
  getCalendarDetail(@Param('calendarId') calendar: string) {
    return this.calendarService.getCalendarDetail(calendar);
  }
}
