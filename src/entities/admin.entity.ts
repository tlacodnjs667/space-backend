import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventWinnerPost } from './event_winner_post.entity';
import { LaunchingCalendar } from './launching_calendar.entity';
import { Lookbook } from './lookbook.entity';
import { Product } from './products.entity';
import { Snap } from './snap.entity';
import { WeeklyCody } from './weekly_cody.entity';

@Entity({
  name: 'admins',
  orderBy: {
    name: 'ASC',
    id: 'DESC',
  },
})
export class Admin {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 100, nullable: false })
  name: string;
  @Column({ length: 100, nullable: false })
  position: string;
  @OneToMany(() => Product, (product) => product.admin)
  products: Product[];
  @OneToMany(() => Lookbook, (lookbook) => lookbook.admin)
  lookbooks: Lookbook[];
  @OneToMany(() => WeeklyCody, (weekly_cody) => weekly_cody.admin)
  weekly_codies: WeeklyCody[];
  @OneToMany(() => Snap, (snap) => snap.admin)
  snaps: Snap[];
  @OneToMany(
    () => LaunchingCalendar,
    (launching_calendar) => launching_calendar.admin,
  )
  launching_calendars: LaunchingCalendar[];
  @OneToMany(
    () => EventWinnerPost,
    (event_winner_post) => event_winner_post.admin,
  )
  event_winner_posts: EventWinnerPost[];
}
