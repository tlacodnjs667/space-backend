import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'colors' })
export class Color {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ length: 50, nullable: false })
  fff: string;
}
