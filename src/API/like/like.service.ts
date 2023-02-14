import { Injectable } from '@nestjs/common';
import { CreateLikeDto, CreateReviewLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  async addWishlist(userId: number, likeOption: CreateLikeDto) {
    const checkWishlist = await LikeRepository.checkWishlist(
      userId,
      likeOption.productId,
      likeOption.optionId,
    );

    if (!checkWishlist.length) {
      const { insertId } = await LikeRepository.addWishlist(
        userId,
        likeOption.productId,
        likeOption.optionId,
      );
      return { insertId };
    } else {
      return await LikeRepository.checkDeleteWishlist(
        userId,
        likeOption.productId,
        likeOption.optionId,
      );
    }
  }

  getWishlist(userId: number) {
    return LikeRepository.getWishlist(userId);
  }

  deleteWishlist(userId: number, likeId: number | number[]) {
    const query = likeId
      ? `WHERE userId = ${userId} AND id IN (${likeId})`
      : `WHERE userId = ${userId}`;
    return LikeRepository.deleteWishlist(+query);
  }

  updateWishlist(userId: number, item: UpdateLikeDto) {
    return LikeRepository.updateWishlist(userId, item.optionId, item.productId);
  }
  addCalendarLike(userId: number, calendarId: number) {
    return LikeRepository.addCalendarLike(userId, calendarId);
  }

  async addReviewLike(userId: number, review: CreateReviewLikeDto) {
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
