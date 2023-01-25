import { Injectable } from '@nestjs/common';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
  getEventList(eventStatusId: string) {
    return EventRepository.getEventList(eventStatusId);
  }
  getEventDetail(eventId: string) {
    return EventRepository.getEventDetail(eventId);
  }
  getEventWinnerList() {
    return EventRepository.getEventWinnerList();
  }
  getEventWinner(id: string) {
    return EventRepository.getEventWinner(id);
  }
}
