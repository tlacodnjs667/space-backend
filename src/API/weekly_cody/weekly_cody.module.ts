import { Module } from '@nestjs/common';
import { WeeklyCodyService } from './weekly_cody.service';
import { WeeklyCodyController } from './weekly_cody.controller';

@Module({
  controllers: [WeeklyCodyController],
  providers: [WeeklyCodyService]
})
export class WeeklyCodyModule {}
