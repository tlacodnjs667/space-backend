import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from './admin.entity';
import { LookbookImage } from './lookbook_image.entity';
import { Product } from './products.entity';

@Entity({ name: 'lookbooks' })
export class Lookbook {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 100, nullable: false })
  title: string;
  @Column({ length: 100, nullable: false })
  sub_title: string;
  @Column({ length: 1000, nullable: false })
  content: string;
  @Column({ length: 1000, nullable: true })
  thumbnail: string;
  @ManyToOne(() => Admin, (admin) => admin.lookbooks, { nullable: false })
  admin: number;
  @JoinTable({ name: 'lookbook_product' })
  @ManyToMany(() => Product, (product) => product.lookbooks)
  product: Product[];
  @OneToMany(() => LookbookImage, (lookbook_image) => lookbook_image.lookbook, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  lookbook_images: LookbookImage[];
}
