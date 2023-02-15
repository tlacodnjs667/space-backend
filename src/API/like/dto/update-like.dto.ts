import { PartialType } from '@nestjs/mapped-types';
import { CreateLikeDto } from './create-like.dto';

export class UpdateLikeDto extends PartialType(CreateLikeDto) {
  optionId: number;
  productId: number;
  likeId: number;
}
