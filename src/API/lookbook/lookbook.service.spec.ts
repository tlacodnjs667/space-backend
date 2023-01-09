import { Test, TestingModule } from '@nestjs/testing';
import { LookbookService } from './lookbook.service';

describe('LookbookService', () => {
  let service: LookbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LookbookService],
    }).compile();

    service = module.get<LookbookService>(LookbookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
