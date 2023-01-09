export class CreateReviewDto {
  productId: number;
  userId: number;
  title: string;
  content: string;
  thumbnail: string;
  start: number;
}
