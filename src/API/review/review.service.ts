import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  findReviewImageForMain(offset: number) {
    return ReviewRepository.findReviewImageForMain(offset);
  }

  async getReviewFromProductID(reviewId: number) {
    const [detailReview] = await ReviewRepository.findReviewDetailFromImg(
      reviewId,
    );
    console.log(detailReview);

    // detailReview.productId
    const productInfo = await ReviewRepository.getProductInfoWithReview(
      detailReview.productId,
    );

    return { detailReview, productInfo };
  }
  getReviewImgRelated(productId: number, page: number) {
    const offset = 12 * (page - 1);
    return ReviewRepository.getReviewImgRelated(productId, offset);
  }
}
