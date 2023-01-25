export interface IReviewForMain {
  productId: number;
  reviewId: number;
  thumbnail: string;
}

export interface IReviewDetailForMain {
  nickname: string;
  content: string;
  thumbnail: string;
  star: number;
  created_at: string;
  photos: string[];
  helpful: IReviewHelpful;
  unhelpful: IReviewHelpful;
  productId: number;
}

export interface IReviewHelpful {
  reviewId: number;
  helpful?: number;
  unhelpful?: number;
}

export interface IProductReviewImg {
  id: number;
  name: string;
  thumbnail: string;
  reviewCount: number;
  starAverage: number;
}
