import { Module } from '@nestjs/common';
import { LookbookService } from './lookbook.service';
import { LookbookController } from './lookbook.controller';

@Module({
  controllers: [LookbookController],
  providers: [LookbookService],
})
export class LookbookModule {}
