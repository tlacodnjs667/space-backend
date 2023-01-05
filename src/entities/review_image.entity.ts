import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class ReviewImg {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Review, (review) => review.id, { nullable: false })
  review: number;
  @Column({ length: 1000 })
  thumbnail: string;
}
