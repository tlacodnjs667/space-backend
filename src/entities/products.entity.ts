import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Admin } from './admin.entity';
import { Items } from './items.entity';
import { ProductImage } from './product_img.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
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
}