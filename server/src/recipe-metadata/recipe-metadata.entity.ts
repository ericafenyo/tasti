import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class RecipeMetadata extends BaseEntity {
  @Column()
  servings: number;
  @Column({ default: '' })
  facts: string;
  @Column() tags: string;
  @OneToOne((_) => Recipe, (recipe) => recipe.metadata)
  @JoinColumn()
  recipe: Recipe;
}
