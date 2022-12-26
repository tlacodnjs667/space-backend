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
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Product, (product) => product.id)
  product: Product;
  @ManyToOne(() => User, (user) => user.id)
  user: User;
  @Column({ length: 200 })
  title: string;
  @Column({ length: 500 })
  content: string;
  @Column({ length: 1000 })
  thumbnail: string;
  @Column()
  star: number;
  @OneToMany(() => ReviewImg, (review_image) => review_image.id)
  review_image: ReviewImg[];
  @OneToMany(() => ReviewLike, (review_like) => review_like.id)
  review_like: ReviewLike[];
}
