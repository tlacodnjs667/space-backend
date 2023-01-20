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
  @ManyToOne(() => WeeklyStyle, (weekly_style) => weekly_style.weekly_codies, {
    nullable: false,
  })
  weekly_style: WeeklyStyle;
  @ManyToOne(() => Admin, (admin) => admin.weekly_codies, { nullable: false })
  admin: Admin;
  @ManyToMany(() => Hashtag, (hashtag) => hashtag.weekly_codies)
  @JoinTable({ name: 'cody_tag' })
  hashtags: Hashtag[];
  @ManyToMany(() => Product, (product) => product.weekly_codies)
  @JoinTable({ name: 'cody_product' })
  products: Product[];
}
