import { AppDataSource } from 'src/config/data-source';
import { Review } from 'src/entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

export const ReviewRepository = AppDataSource.getRepository(Review).extend({
  checkOrderHistoryOfProductByUser: (createReviewDto: CreateReviewDto) => {
    ReviewRepository.query(`
      
    `);
  },
  createReviewForProduct: (createReviewDto: CreateReviewDto) => {},
});