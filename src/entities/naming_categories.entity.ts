import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class NamingCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 30 })
  name: string;
}
