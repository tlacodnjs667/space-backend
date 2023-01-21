import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  async addWishlist(userId: number, productId: string) {
    const checkWishlist = await LikeRepository.checkWishlist(userId, productId);
    if (!checkWishlist.length) {
      return await LikeRepository.addWishlist(userId, productId);
    } else {
      return await LikeRepository.checkDeleteWishlist(userId, productId);
    }
  }

  getWishlist(userId: number) {
    return LikeRepository.getWishlist(userId);
  }

  deleteWishlist(userId: number, productId: string | string[]) {
    const query = productId
      ? `WHERE userId = ${userId} AND id IN (${productId})`
      : `WHERE userId = ${userId}`;
    return LikeRepository.deleteWishlist(query);
  }

  updateWishlist(userId: number, item: UpdateLikeDto) {
    return LikeRepository.updateWishlist(userId, item.optionId, item.productId);
  }
  addCalendarLike(userId: number, calendarId: string) {
    return LikeRepository.addCalendarLike(userId, calendarId);
  }

  async addReviewLike(userId: number, review: CreateLikeDto) {
    const checkReviewLike = await LikeRepository.checkReviewLike(
      userId,
      review.is_helpful,
      review.reviewId,
    );
    if (!checkReviewLike.length) {
      return await LikeRepository.addReviewLike(
        userId,
        review.is_helpful,
        review.reviewId,
      );
    } else {
      return await LikeRepository.deleteReviewLike(
        userId,
        review.is_helpful,
        review.reviewId,
      );
    }
  }
}
