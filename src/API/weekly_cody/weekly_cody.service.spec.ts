import { Test, TestingModule } from '@nestjs/testing';
import { WeeklyCodyService } from './weekly_cody.service';

describe('WeeklyCodyService', () => {
  let service: WeeklyCodyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeeklyCodyService],
    }).compile();

    service = module.get<WeeklyCodyService>(WeeklyCodyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
