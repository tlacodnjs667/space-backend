import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeeklyCodyService } from './weekly_cody.service';
import { CreateWeeklyCodyDto } from './dto/create-weekly_cody.dto';
import { UpdateWeeklyCodyDto } from './dto/update-weekly_cody.dto';

@Controller('weekly-cody')
export class WeeklyCodyController {
  constructor(private readonly weeklyCodyService: WeeklyCodyService) {}

  @Post()
  create(@Body() createWeeklyCodyDto: CreateWeeklyCodyDto) {
    return this.weeklyCodyService.create(createWeeklyCodyDto);
  }

  @Get()
  findAll() {
    return this.weeklyCodyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weeklyCodyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeeklyCodyDto: UpdateWeeklyCodyDto) {
    return this.weeklyCodyService.update(+id, updateWeeklyCodyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weeklyCodyService.remove(+id);
  }
}
