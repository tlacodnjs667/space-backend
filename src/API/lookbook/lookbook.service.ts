import { Injectable } from '@nestjs/common';
import { ILookbookForMain, ILookbookForMainDetail } from './ILookbook';
import { LookbookRepository } from './lookbook.repository';

@Injectable()
export class LookbookService {
  getLookbookList(offset: number) {
    return LookbookRepository.getLookbookList(offset);
  }
  getLookbookDetail(lookbookId: string) {
    return LookbookRepository.getLookbookDetail(lookbookId);
  }
  getLookbookForMain(): Promise<ILookbookForMain[]> {
    return LookbookRepository.getLookbookForMain();
  }
  getLookbookDetailForMain(
    lookbookId: number,
  ): Promise<ILookbookForMainDetail[]> {
    return LookbookRepository.getLookbookDetailForMain(lookbookId);
  }
}
