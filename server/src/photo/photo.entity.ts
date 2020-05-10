import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @ManyToOne(type => Recipe, recipe => recipe.photos, { cascade: true })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;
}
