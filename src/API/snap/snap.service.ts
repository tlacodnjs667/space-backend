import { Injectable } from '@nestjs/common';
import { CreateSnapDto } from './dto/create-snap.dto';
import { UpdateSnapDto } from './dto/update-snap.dto';

@Injectable()
export class SnapService {
  create(createSnapDto: CreateSnapDto) {
    return 'This action adds a new snap';
  }

  findAll() {
    return `This action returns all snap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} snap`;
  }

  update(id: number, updateSnapDto: UpdateSnapDto) {
    return `This action updates a #${id} snap`;
  }

  remove(id: number) {
    return `This action removes a #${id} snap`;
  }
}
