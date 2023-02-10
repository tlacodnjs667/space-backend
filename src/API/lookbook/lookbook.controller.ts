import { Controller, Get, Param, Query } from '@nestjs/common';
import { ILookbookForMain, ILookbookForMainDetail } from './ILookbook';
import { LookbookService } from './lookbook.service';

@Controller('lookbook')
export class LookbookController {
  constructor(private readonly lookbookService: LookbookService) {}
  @Get('detail/:lookbookId')
  getLookbookDetail(@Param('lookbookId') lookbookId: string) {
    return this.lookbookService.getLookbookDetail(lookbookId);
  }
  @Get('main')
  getLookbookForMain(): Promise<ILookbookForMain[]> {
    return this.lookbookService.getLookbookForMain();
  }
  @Get('main/:lookbookId')
  getLookbookDetailForMain(
    @Param('lookbookId') lookbookId: string,
  ): Promise<ILookbookForMainDetail[]> {
    return this.lookbookService.getLookbookDetailForMain(+lookbookId);
  }
  @Get()
  getLookbookList(@Query('offset') offset: string) {
    return this.lookbookService.getLookbookList(+offset);
  }
}
