import { Controller, Get, Query } from '@nestjs/common';
import { WeeklyCodyService } from './weekly_cody.service';
import { WeeklyCodyListDto } from './dto/create-weekly_cody.dto';

@Controller('weekly-cody')
export class WeeklyCodyController {
  constructor(private readonly weeklyCodyService: WeeklyCodyService) {}

  @Get()
  getweeklyCodyList(@Query() weekly: WeeklyCodyListDto) {
    return this.weeklyCodyService.getweeklyCodyList(weekly);
  }
  @Get('detail')
  getweeklyCodyDetail(@Query('codyId') codyId: string) {
    return this.weeklyCodyService.getweeklyCodyDetail(codyId);
  }
}
