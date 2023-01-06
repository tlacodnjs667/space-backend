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

@Entity({name:'products'})
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 100, nullable: false })
  name: string;
  @Column({ length: 1000, nullable: false })
  thumbnail: string;
  @Column({ length: 1000, nullable: false })
  description: string;
  @Column({nullable: false})
  price: number;
  @CreateDateColumn({type: 'timestamp', nullable: false})
  created_at: Date;
  @UpdateDateColumn({type: 'timestamp', nullable: false})
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
  @ManyToMany(() => Lookbook, (lookbook) => lookbook.product)
  lookbook: Lookbook[];
  @ManyToMany(() => WeeklyCody, (weekly_cody) => weekly_cody.product)
  weekly_cody: WeeklyCody[];
}
