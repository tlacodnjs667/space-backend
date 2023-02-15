export class CreateReviewLikeDto {
  is_helpful: number;
  reviewId: number;
}

export class CreateLikeDto {
  productId: number;
  optionId: number;
}
export class CreateItem {
  optionId: number;
  productId: number;
}
