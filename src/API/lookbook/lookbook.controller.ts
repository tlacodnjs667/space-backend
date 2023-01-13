import { Controller, Get, Query } from '@nestjs/common';
import { query } from 'express';
import { LookbookService } from './lookbook.service';

@Controller('lookbook')
export class LookbookController {
  constructor(private readonly lookbookService: LookbookService) {}
  @Get('list')
  getLookbookList(@Query('offset') offset: string) {
    return this.lookbookService.getLookbookList(+offset);
  }
}
