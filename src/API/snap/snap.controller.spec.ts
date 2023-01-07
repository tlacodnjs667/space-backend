import { Test, TestingModule } from '@nestjs/testing';
import { SnapController } from './snap.controller';
import { SnapService } from './snap.service';

describe('SnapController', () => {
  let controller: SnapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnapController],
      providers: [SnapService],
    }).compile();

    controller = module.get<SnapController>(SnapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
