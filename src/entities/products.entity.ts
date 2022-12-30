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
import { Cart } from './cart.entity';
import { Items } from './items.entity';
import { ProductLike } from './like.entity';
import { Lookbook } from './lookbook.entity';
import { ProductImage } from './product_img.entity';
import { Snap } from './snap.entity';
import { WeeklyCody } from './weekly_cody.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  name: string;
  @Column({ length: 1000 })
  thumbnail: string;
  @Column({ length: 1000 })
  description: string;
  @Column()
  price: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne(() => Admin, (admin) => admin.id)
  admin: number;
  @ManyToOne(() => Items, (item) => item.id)
  item: number;
  @OneToMany(() => ProductImage, (product_img) => product_img.id)
  product_img: Product[];
  @OneToMany(() => ProductLike, (product_like) => product_like.id)
  product_like: ProductLike[];
  @OneToMany(() => Snap, (snap) => snap.id)
  snap: Snap[];
  @OneToMany(() => Cart, (cart) => cart.id)
  cart: Cart[];
  @ManyToMany(() => Lookbook, (lookbook) => lookbook.id)
  lookbook: Lookbook[];
  @ManyToMany(() => WeeklyCody, (weekly_cody) => weekly_cody.id)
  weekly_cody: WeeklyCody[];
}
