import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductOptions } from './product_options.entity';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 200 })
  name: string;
  @OneToMany(() => ProductOptions, (product_option) => product_option.id)
  product_option: ProductOptions[];
}
