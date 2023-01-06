import { Controller, Get, HttpCode } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get('nav')
  @HttpCode(201)
  findCategories() {
    return this.mainService.findCategories();
  }
}
