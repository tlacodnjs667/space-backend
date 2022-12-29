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

@Entity()
export class WeeklyCody {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 1000 })
  thumbnail: string;
  @ManyToOne(() => WeeklyStyle, (weekly_style) => weekly_style.id)
  weekly_style: WeeklyStyle;
  @ManyToOne(() => Admin, (admin) => admin.id)
  admin: Admin;
  @ManyToMany(() => Hashtag, (hashtag) => hashtag.id)
  @JoinTable({ name: 'cody_tag' })
  hashtag: Hashtag[];
  @ManyToMany(() => Product, (product) => product.id)
  @JoinTable({ name: 'cody_product' })
  product: Product[];
}
