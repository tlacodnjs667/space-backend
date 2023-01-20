import { Test, TestingModule } from '@nestjs/testing';
import { SnapService } from './snap.service';

describe('SnapService', () => {
  let service: SnapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnapService],
    }).compile();

    service = module.get<SnapService>(SnapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
