import { Controller, Get, Param, Query } from '@nestjs/common';
import { WeeklyCodyService } from './weekly_cody.service';
import { WeeklyCodyListDto } from './dto/create-weekly_cody.dto';

@Controller('weekly-cody')
export class WeeklyCodyController {
  constructor(private readonly weeklyCodyService: WeeklyCodyService) {}

  @Get()
  getweeklyCodyList(@Query() weekly: WeeklyCodyListDto) {
    return this.weeklyCodyService.getweeklyCodyList(weekly);
  }
  @Get('detail/:codyId')
  getweeklyCodyDetail(@Param('codyId') codyId: string) {
    return this.weeklyCodyService.getweeklyCodyDetail(codyId);
  }
}
