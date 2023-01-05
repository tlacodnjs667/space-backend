import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lookbook } from './lookbook.entity';

@Entity({ name: 'lookbook_images' })
export class LookbookImage {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 1000, nullable: false })
  image: string;
  @ManyToOne(() => Lookbook, (lookbook) => lookbook.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  lookbook: Lookbook;
}
