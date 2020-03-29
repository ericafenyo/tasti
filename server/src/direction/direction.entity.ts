import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Direction extends BaseEntity {
  @Column()
  text: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.directions)
  recipe: Recipe;
}
