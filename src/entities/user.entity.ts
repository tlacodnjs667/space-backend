import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Cart } from './cart.entity';
import { ProductLike } from './like.entity';
import { Order } from './order.entity';
import { Review } from './review.entity';
import { ReviewLike } from './review_like.entity';

@Entity()
@Unique(['kakao_id', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100, nullable: false })
  name: string;
  @Column({ length: 200, nullable: true, unique: true })
  kakao_id: string;
  @Column({ length: 100, nullable: false, unique: true })
  email: string;
  @Column('date')
  birthday: string;
  @Column({ length: 150, nullable: false })
  nickname: string;
  @Column({ length: 1000, nullable: false })
  thumbnail: string;
  @Column({ length: 10, nullable: true })
  gender: string;
  @Column({ length: 100, nullable: false })
  phone: string;
  @OneToMany(() => Review, (review) => review.id)
  review: Review[];
  @OneToMany(() => ReviewLike, (review_like) => review_like.id)
  review_like: ReviewLike[];
  @OneToMany(() => ProductLike, (product_like) => product_like.id)
  product_like: ProductLike[];
  @OneToMany(() => Cart, (cart) => cart.id)
  cart: Cart[];
  @OneToMany(() => Order, (order) => order.id)
  order: Order[];
}
