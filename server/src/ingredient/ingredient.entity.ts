import { Entity, Column, ManyToOne } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Ingredient extends BaseEntity {
  @Column({ nullable: false , unique: true})
  name: string;

  @ManyToOne(type => Recipe, recipe => recipe.ingredients)
  recipe: Recipe;
}
