import { Controller, Get, Query } from '@nestjs/common';
import { SnapService } from './snap.service';
import { SnapDto } from './dto/create-snap.dto';
@Controller('snap')
export class SnapController {
  constructor(private readonly snapService: SnapService) {}
  @Get('main')
  getSnapForMain() {
    return this.snapService.getSnapForMain();
  }

  @Get('detail')
  getSnapDetail(@Query() snap: SnapDto) {
    return this.snapService.getSnapDetail(snap);
  }
  @Get()
  getSnapList(@Query('hashtag') hashtag: string) {
    return this.snapService.getSnapList(hashtag);
  }
}
