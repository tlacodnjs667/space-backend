import { CreateReviewDto, CreateReviewReqDto } from './dto/create-review.dto';

export interface IReviewInfo {
  id: number;
  productId: number;
  thumbnail: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  star: number;
}

export interface IReviewInfoToCreateOnHeader {
  user: number;
}

export interface IReviewInfoToCreateOnFile {
  location: string;
}

export interface IReviewInfoToCreate extends CreateReviewDto {
  thumbnail: string;
}

export interface IReviewCanCreate {
  productId: number;
  productName: string;
  thumbnail: string;
}
