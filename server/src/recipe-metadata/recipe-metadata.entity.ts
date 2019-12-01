import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';

@Entity()
export class RecipeMetadata {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ nullable: false })
  servings: number;
  @Column({ nullable: false })
  facts: string;
  @Column({ nullable: false })
  tags: string;
  @OneToOne((_) => Recipe, (recipe) => recipe.metadata)
  @JoinColumn()
  recipe: Recipe;
}
