import { Controller, Get, HttpCode } from '@nestjs/common';
import { MainService } from './main.service';
import { User } from 'src/entities/user.entity';

@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get('nav')
  @HttpCode(201)
  findCategories() {
    return this.mainService.findCategories();
  }
}
