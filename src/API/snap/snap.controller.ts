import { Controller, Get } from '@nestjs/common';
import { SnapService } from './snap.service';

@Controller('snap')
export class SnapController {
  constructor(private readonly snapService: SnapService) {}
  @Get('main')
  getSnapsForAdv() {
    return this.snapService.getSnapsForAdv();
  }
}
