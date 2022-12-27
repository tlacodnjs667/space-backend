import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventWinnerPost } from './event_winner_post.entity';
import { LaunchingCalendar } from './launching_calendar.entity';
import { Lookbook } from './lookbook.entity';
import { Product } from './products.entity';
import { Snap } from './snap.entity';
import { WeeklyCody } from './weekly_cody.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  name: string;
  @Column({ length: 100 })
  position: string;
  @OneToMany(() => Product, (product) => product.id)
  product: Product[];
  @OneToMany(() => Lookbook, (lookbook) => lookbook.id)
  lookbook: Lookbook[];
  @OneToMany(() => WeeklyCody, (weekly_cody) => weekly_cody.id)
  weekly_cody: WeeklyCody[];
  @OneToMany(() => Snap, (snap) => snap.id)
  snap: Snap[];
  @OneToMany(
    () => LaunchingCalendar,
    (launching_calendar) => launching_calendar.id,
  )
  launching_calendar: LaunchingCalendar[];
  @OneToMany(() => EventWinnerPost, (event_winner_post) => event_winner_post.id)
  event_winner_post: EventWinnerPost;
}
