import { Test, TestingModule } from '@nestjs/testing';
import { LookbookController } from './lookbook.controller';
import { LookbookService } from './lookbook.service';

describe('LookbookController', () => {
  let controller: LookbookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LookbookController],
      providers: [LookbookService],
    }).compile();

    controller = module.get<LookbookController>(LookbookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
