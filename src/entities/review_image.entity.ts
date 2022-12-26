import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './review.entity';

@Entity()
export class ReviewImg {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Review, (review) => review.id)
  review: number;
  @Column({ length: 1000 })
  thumbnail: string;
}
