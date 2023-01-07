import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyCodyController } from './weekly_cody.controller';
import { WeeklyCodyService } from './weekly_cody.service';

describe('WeeklyCodyController', () => {
  let controller: WeeklyCodyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeeklyCodyController],
      providers: [WeeklyCodyService],
    }).compile();

    controller = module.get<WeeklyCodyController>(WeeklyCodyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
