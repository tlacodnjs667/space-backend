import { Injectable } from '@nestjs/common';
import { LookbookRepository } from './lookbook.repository';

@Injectable()
export class LookbookService {
  getLookbookList(offset: number) {
    return LookbookRepository.getLookbookList(offset);
  }
}
