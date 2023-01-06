import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from './admin.entity';
import { Hashtag } from './hashtag.entity';
import { Product } from './products.entity';
import { WeeklyStyle } from './weekly_style.entity';

@Entity({ name: 'weekly_cody' })
export class WeeklyCody {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 1000, nullable: false })
  thumbnail: string;
  @ManyToOne(() => WeeklyStyle, (weekly_style) => weekly_style.id, {
    nullable: false,
  })
  weekly_style: WeeklyStyle;
  @ManyToOne(() => Admin, (admin) => admin.id, { nullable: false })
  admin: Admin;
  @ManyToMany(() => Hashtag, (hashtag) => hashtag.id)
  @JoinTable({ name: 'cody_tag' })
  hashtag: Hashtag[];
  @ManyToMany(() => Product, (product) => product.weekly_cody)
  @JoinTable({ name: 'cody_product' })
  product: Product[];
}
