import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NamingCategories } from './naming_categories.entity';

@Entity()
export class MainCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => NamingCategories, (naming_category) => naming_category.id)
  naming_categories: NamingCategories[];
}
