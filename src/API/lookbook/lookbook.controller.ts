import { Controller, Get, Query } from '@nestjs/common';
import { LookbookService } from './lookbook.service';

@Controller('lookbook')
export class LookbookController {
  constructor(private readonly lookbookService: LookbookService) {}
  @Get()
  getLookbookList(@Query('offset') offset: string) {
    return this.lookbookService.getLookbookList(+offset);
  }

  @Get('list')
  getLookbookDetail(@Query('lookbookId') lookbookId: string) {
    return this.lookbookService.getLookbookDetail(lookbookId);
  }
}
