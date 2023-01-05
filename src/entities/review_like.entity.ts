import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity({ name: 'review_likes' })
export class ReviewLike {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  is_helpful: boolean;
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;
  @ManyToOne(() => Review, (review) => review.id, { nullable: false })
  review: Review;
}
