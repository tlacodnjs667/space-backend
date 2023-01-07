import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LookbookService } from './lookbook.service';
import { CreateLookbookDto } from './dto/create-lookbook.dto';
import { UpdateLookbookDto } from './dto/update-lookbook.dto';

@Controller('lookbook')
export class LookbookController {
  constructor(private readonly lookbookService: LookbookService) {}

  @Post()
  create(@Body() createLookbookDto: CreateLookbookDto) {
    return this.lookbookService.create(createLookbookDto);
  }

  @Get()
  findAll() {
    return this.lookbookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lookbookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLookbookDto: UpdateLookbookDto) {
    return this.lookbookService.update(+id, updateLookbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lookbookService.remove(+id);
  }
}
