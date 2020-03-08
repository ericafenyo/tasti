import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Direction extends BaseEntity {

  @Column({ nullable: false, unique: true })
  text: string;

  @ManyToOne((type) => Recipe, (recipe) => recipe.directions)
  recipe: Recipe;
}
