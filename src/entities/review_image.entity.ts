import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class ReviewImg {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Review, (review) => review.review_images, { nullable: true })
  review: number;
  @Column({ length: 1000 })
  thumbnail: string;
}
