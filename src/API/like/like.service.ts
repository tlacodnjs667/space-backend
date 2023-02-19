import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateItem,
  CreateLikeDto,
  CreateReviewLikeDto,
} from './dto/create-like.dto';
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
      return await LikeRepository.addWishlist(
        userId,
        likeOption.productId,
        likeOption.optionId,
      );
    } else {
      return await LikeRepository.checkDeleteWishlist(
        userId,
        likeOption.productId,
        likeOption.optionId,
      );
    }
  }

  async createUserLike(userId: number, item: CreateItem) {
    const checkWishlist = await LikeRepository.checkWishlist(
      userId,
      item.productId,
      item.optionId,
    );
    if (!checkWishlist.length) {
      return await LikeRepository.addWishlist(
        userId,
        item.productId,
        item.optionId,
      );
    } else {
      const message = 'PRODUCT_ALREADY_REGISTERED';
      return message;
    }
  }

  getWishlist(userId: number) {
    return LikeRepository.getWishlist(userId);
  }

  deleteWishlist(userId: number, likeId: number | number[]) {
    const query = likeId
      ? `WHERE userId = ${userId} AND id IN (${likeId})`
      : `WHERE userId = ${userId}`;
    return LikeRepository.deleteWishlist(query);
  }

  async updateWishlist(userId: number, item: UpdateLikeDto) {
    const checkWishlist = await LikeRepository.checkWishlist(
      userId,
      item.productId,
      item.optionId,
    );

    if (!checkWishlist || checkWishlist.length === 0) {
      return await LikeRepository.updateWishlist(item.optionId, item.likeId);
    } else if (checkWishlist.length === 1) {
      throw new HttpException('ALREADY', HttpStatus.BAD_REQUEST);
    }
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
