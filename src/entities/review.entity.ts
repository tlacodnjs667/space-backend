import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { Product } from './products.entity';
import { ReviewImg } from './review_image.entity';
import { ReviewLike } from './review_like.entity';
import { User } from './user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Product, (product) => product.reviews, { nullable: false })
  product: Product;
  @ManyToOne(() => User, (user) => user.reviews, { nullable: false })
  user: User;
  @Column({ length: 200, nullable: false })
  title: string;
  @Column({ length: 500, nullable: false })
  content: string;
  @Column({ length: 1000, nullable: true })
  thumbnail: string;
  @Column({ type: 'int', nullable: false })
  star: number;
  @OneToMany(() => ReviewImg, (review_image) => review_image.review)
  review_images: ReviewImg[];
  @OneToMany(() => ReviewLike, (review_like) => review_like.review)
  review_likes: ReviewLike[];
}
