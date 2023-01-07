import { Module } from '@nestjs/common';
import { SnapService } from './snap.service';
import { SnapController } from './snap.controller';

@Module({
  controllers: [SnapController],
  providers: [SnapService]
})
export class SnapModule {}
