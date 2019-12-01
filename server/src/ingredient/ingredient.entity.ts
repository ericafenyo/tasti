import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid') 
  id: string;
  @Column({ nullable: false })
  name: string;

  @ManyToOne(type => Recipe, recipe => recipe.ingredients)
  recipe: Recipe;
}
