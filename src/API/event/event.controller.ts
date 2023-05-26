import { Controller, Get, Query, Param } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getEventList(@Query('eventStatusId') eventStatusId: string) {
    return this.eventService.getEventList(eventStatusId);
  }

  @Get('detail')
  getEventDetail(@Query('eventId') eventId: string) {
    return this.eventService.getEventDetail(eventId);
  }

  @Get('winner')
  getEventWinnerList() {
    return this.eventService.getEventWinnerList();
  }

  @Get(':id')
  getEventWinner(@Param('id') id: string) {
    return this.eventService.getEventWinner(id);
  }
}
