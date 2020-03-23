import { Entity, Column, ManyToOne } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Ingredient extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Recipe, recipe => recipe.ingredients)
  recipe: Recipe;
}
