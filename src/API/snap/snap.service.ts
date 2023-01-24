import { Injectable } from '@nestjs/common';
import { SnapRepository } from './snap.repository';
import { ISnapForMain } from './snapInterface';

@Injectable()
export class SnapService {
  getSnapsForAdv(): Promise<ISnapForMain[]> {
    return SnapRepository.getSnapsForAdv();
  }
}
