import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column() name: string;
  @Column() imagePath: string;
}
