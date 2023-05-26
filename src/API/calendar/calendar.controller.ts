import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  getCalendarList(@Query('offset') offset: string) {
    return this.calendarService.getCalendarList(offset);
  }

  @Get('detail')
  getCalendarDetail(@Query('calendar') calendar: string) {
    return this.calendarService.getCalendarDetail(calendar);
  }
}
