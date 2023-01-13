export class CreateReviewDto {
  productId: number;
  userId: number;
  title: string;
  content: string;
  thumbnail: string;
  start: number;
}

/* 
리뷰 order-product table 내 해당 유저의 구매 내역이 있는지 확인 후, 
해당 유저가 동일한 상품으로 리뷰를 작성한 적이 있는지 체크가 필요.

또한 order의 상태가 구매 확정 상태일 때, 이를 해결할 수 있는 방법 필요
*/
