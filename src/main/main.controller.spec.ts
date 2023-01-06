import { Test, TestingModule } from '@nestjs/testing';
import { MainController } from './main.controller';
import { MainService } from './main.service';

describe('MainController', () => {
  let controller: MainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainController],
      providers: [MainService],
    }).compile();

    controller = module.get<MainController>(MainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
