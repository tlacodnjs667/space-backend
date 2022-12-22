import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { SubCategories } from './sub_categories.entity';
import { NamingCategories } from './naming_categories.entity';

@Entity()
export class MainCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 30 })
  name: string;
  @OneToMany(() => NamingCategories, (naming_category) => naming_category.id)
  naming_categories: NamingCategories[];
  @ManyToMany(() => SubCategories)
  @JoinTable()
  sub_categories: SubCategories[];
}
