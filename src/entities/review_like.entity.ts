import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity()
export class ReviewLike {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  is_helpful: boolean;
  @ManyToOne(() => User, (user) => user.id)
  user: User;
  @ManyToOne(() => Review, (review) => review.id)
  review: Review;
}
