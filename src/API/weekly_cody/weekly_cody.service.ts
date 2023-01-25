import { Injectable } from '@nestjs/common';
import { WeeklyCodyListDto } from './dto/create-weekly_cody.dto';
import { WeeklyCodyRepository } from './weekly_cody.repository';

@Injectable()
export class WeeklyCodyService {
  getweeklyCodyList(weekly: WeeklyCodyListDto) {
    const sum = 18 * (weekly.offset - 1);
    return WeeklyCodyRepository.getweeklyCodyList(weekly.style, sum);
  }
  getweeklyCodyDetail(codyId: string) {
    return WeeklyCodyRepository.getweeklyCodyDetail(codyId);
  }
}
