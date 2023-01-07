import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WeeklyCody } from './weekly_cody.entity';

@Entity()
export class WeeklyStyle {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  name: string;
  @OneToMany(() => WeeklyCody, (weekly_cody) => weekly_cody.weekly_style)
  weekly_codies: WeeklyCody[];
}
