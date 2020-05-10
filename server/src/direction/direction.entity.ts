import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';

@Entity()
export class Direction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Recipe, (recipe) => recipe.directions, { cascade: true })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;
}
