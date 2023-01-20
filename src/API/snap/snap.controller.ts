import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SnapService } from './snap.service';
import { CreateSnapDto } from './dto/create-snap.dto';
import { UpdateSnapDto } from './dto/update-snap.dto';

@Controller('snap')
export class SnapController {
  constructor(private readonly snapService: SnapService) {}

  @Post()
  create(@Body() createSnapDto: CreateSnapDto) {
    return this.snapService.create(createSnapDto);
  }

  @Get()
  findAll() {
    return this.snapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snapService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnapDto: UpdateSnapDto) {
    return this.snapService.update(+id, updateSnapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snapService.remove(+id);
  }
}
