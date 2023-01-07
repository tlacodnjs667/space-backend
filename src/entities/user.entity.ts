import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { CalendarComment } from './calendar_comment.entity';
import { CalendarLike } from './calendar_like.entity';
import { Cart } from './cart.entity';
import { EventComment } from './event_comment.entity';
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
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
  @OneToMany(() => EventComment, (event_comments) => event_comments.user)
  event_comments: EventComment[];
  @OneToMany(() => ReviewLike, (review_like) => review_like.user)
  review_likes: ReviewLike[];
  @OneToMany(() => ProductLike, (product_like) => product_like.user)
  product_likes: ProductLike[];
  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
  @OneToMany(
    () => CalendarComment,
    (calendar_comments) => calendar_comments.user,
  )
  calendar_comments: CalendarComment[];
  @OneToMany(() => CalendarLike, (calendar_likes) => calendar_likes.user)
  calendar_likes: CalendarLike[];
}
