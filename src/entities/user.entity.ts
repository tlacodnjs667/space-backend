import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 100 })
  name: string;
  @Column({ length: 200 })
  kakao_id: string;
  @Column({ length: 100 })
  email: string;
  @Column('date')
  birthday: string;
  @Column({ length: 150 })
  nickname: string;
  @Column({ length: 1000 })
  thumbnail: string;
  @Column({ length: 10 })
  gender: string;
  @Column({ length: 100 })
  phone: string;
}
