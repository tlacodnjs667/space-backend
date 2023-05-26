import { Injectable } from '@nestjs/common';
import { SnapDto } from './dto/create-snap.dto';
import { SnapRepository } from './snap.repository';

@Injectable()
export class SnapService {
  async getSnapList(hashtag: string) {
    const snap = await SnapRepository.getSnapList(hashtag);
    const count = await SnapRepository.getCountSnap(hashtag);
    return { snap, count };
  }
  async getSnapDetail(snap: SnapDto) {
    const list = await SnapRepository.getSnapList(snap.hashtag);
    const counts = await SnapRepository.getCountSnap(snap.hashtag);
    const detail = await SnapRepository.getSnapDetail(snap.snapId);
    return { list, counts, detail };
  }
}
