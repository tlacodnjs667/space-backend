import { Injectable } from '@nestjs/common';
import { CreateLookbookDto } from './dto/create-lookbook.dto';
import { UpdateLookbookDto } from './dto/update-lookbook.dto';

@Injectable()
export class LookbookService {
  create(createLookbookDto: CreateLookbookDto) {
    return 'This action adds a new lookbook';
  }

  findAll() {
    return `This action returns all lookbook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lookbook`;
  }

  update(id: number, updateLookbookDto: UpdateLookbookDto) {
    return `This action updates a #${id} lookbook`;
  }

  remove(id: number) {
    return `This action removes a #${id} lookbook`;
  }
}
