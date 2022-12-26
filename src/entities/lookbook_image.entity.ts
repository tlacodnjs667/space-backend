import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lookbook } from './lookbook.entity';

@Entity()
export class LookbookImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 1000 })
  image: string;
  @ManyToOne(() => Lookbook, (lookbook) => lookbook.id)
  lookbook: Lookbook;
}
