import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WeeklyCody } from './weekly_cody.entity';

@Entity({ name: 'hashtags' })
export class Hashtag {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 30, nullable: false })
  name: string;
  @ManyToMany(() => WeeklyCody, (weekly_cody) => weekly_cody.id, {
    onDelete: 'NO ACTION',
  })
  weekly_cody: WeeklyCody[];
}
