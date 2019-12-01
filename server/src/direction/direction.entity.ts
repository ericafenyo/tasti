import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';

@Entity()
export class Direction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  text: string;

  @ManyToOne((type) => Recipe, (recipe) => recipe.directions)
  recipe: Recipe;
}
