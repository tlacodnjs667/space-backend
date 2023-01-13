import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Admin } from './admin.entity';
import { Items } from './items.entity';
import { ProductLike } from './like.entity';
import { Lookbook } from './lookbook.entity';
import { ProductColor } from './product_color.entity';
import { ProductImage } from './product_img.entity';
import { Review } from './review.entity';
import { Snap } from './snap.entity';
import { WeeklyCody } from './weekly_cody.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 100, nullable: false })
  name: string;
  @Column({ length: 1000, nullable: false })
  thumbnail: string;
  @Column({ length: 1000, nullable: false })
  description: string;
  @Column({ nullable: false })
  price: number;
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updated_at: Date;
  @ManyToOne(() => Admin, (admin) => admin.products)
  admin: number;
  @ManyToOne(() => Items, (item) => item.products)
  item: number;
  @OneToMany(() => ProductImage, (product_img) => product_img.id)
  product_imgs: Product[];
  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
  @OneToMany(() => ProductLike, (product_like) => product_like.id)
  product_likes: ProductLike[];
  @OneToMany(() => Snap, (snap) => snap.id)
  snaps: Snap[];
  @OneToMany(() => ProductColor, (product_color) => product_color.product)
  product_colors: ProductColor[];
  @ManyToMany(() => Lookbook, (lookbook) => lookbook.product)
  lookbooks: Lookbook[];
  @ManyToMany(() => WeeklyCody, (weekly_cody) => weekly_cody.products)
  weekly_codies: WeeklyCody[];
}
