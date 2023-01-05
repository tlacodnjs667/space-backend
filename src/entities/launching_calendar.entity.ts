import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Admin } from './admin.entity';

@Entity({ name: 'launching_calendars' })
export class LaunchingCalendar {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 300, nullable: false, type: 'varchar' })
  title: string;
  @Column({ length: 300, nullable: false, type: 'varchar' })
  email: string;
  @Column({ length: 1000, nullable: false, type: 'varchar' })
  thumbnail: string;
  @Column({ length: 1000, nullable: false, type: 'varchar' })
  content: string;
  @Column({ length: 1000, nullable: true, type: 'varchar' })
  image: string;
  @Column({ type: 'int', default: 0 })
  likeCounting: number;
  @ManyToOne(() => Admin, (admin) => admin.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  admin_id: Admin;
}
