import { Injectable } from '@nestjs/common';
import { CreateWeeklyCodyDto } from './dto/create-weekly_cody.dto';
import { UpdateWeeklyCodyDto } from './dto/update-weekly_cody.dto';

@Injectable()
export class WeeklyCodyService {
  create(createWeeklyCodyDto: CreateWeeklyCodyDto) {
    return 'This action adds a new weeklyCody';
  }

  findAll() {
    return `This action returns all weeklyCody`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weeklyCody`;
  }

  update(id: number, updateWeeklyCodyDto: UpdateWeeklyCodyDto) {
    return `This action updates a #${id} weeklyCody`;
  }

  remove(id: number) {
    return `This action removes a #${id} weeklyCody`;
  }
}
