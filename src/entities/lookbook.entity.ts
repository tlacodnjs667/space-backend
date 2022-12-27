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

@Entity()
export class Lookbook {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100, nullable: false })
  title: string;
  @Column({ length: 100, nullable: false })
  sub_title: string;
  @Column({ length: 1000, nullable: false })
  content: string;
  @Column({ length: 1000, nullable: false })
  thumbnail: string;
  @ManyToOne(() => Admin, (admin) => admin.id, { nullable: false })
  admin: number;
  @ManyToMany(() => Product, (product) => product.id)
  @JoinTable()
  product: Product[];
  @OneToMany(() => LookbookImage, (lookbook_image) => lookbook_image.id)
  lookbook: Lookbook;
}
