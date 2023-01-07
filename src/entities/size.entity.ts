import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductOptions } from './product_options.entity';

@Entity()
export class Size {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 40, nullable: false })
  name: string;
  @OneToMany(() => ProductOptions, (product_option) => product_option.size)
  product_options: ProductOptions[];
}
