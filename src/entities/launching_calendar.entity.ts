import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Admin } from './admin.entity';

@Entity()
export class LaunchingCalendar {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 300 })
  title: string;
  @Column({ length: 100 })
  email: string;
  @Column({ length: 1000 })
  thumbnail: string;
  @Column({ length: 1000 })
  content: string;
  @Column({ length: 1000 })
  image: string;
  @Column('int')
  likeCounting: number;
  @ManyToOne(() => Admin, (admin) => admin.id, {
    nullable: true,
    cascade: false,
  })
  admin_id: Admin;
}
