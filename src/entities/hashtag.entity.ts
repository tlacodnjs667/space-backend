import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WeeklyCody } from './weekly_cody.entity';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 100 })
  name: string;
  @ManyToMany(() => WeeklyCody, (weekly_cody) => weekly_cody.id)
  weekly_cody: WeeklyCody[];
}
