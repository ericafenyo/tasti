import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn
} from 'typeorm';
import { User } from '../user/user.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { Direction } from '../direction/direction.entity';
import { Photo } from '../photo/photo.entity';
import { RecipeMetadata } from '../recipe-metadata/recipe-metadata.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;

  @Column() imagePath: string;

  @CreateDateColumn() 
  createdAt: Date;

  @ManyToOne((_) => User, (user) => user.recipes, { nullable: false })
  @JoinColumn({ name: 'userId' })
  owner: User;

  @OneToMany((_) => Ingredient, (ingredient) => ingredient.recipe)
  ingredients: Ingredient[];

  @OneToMany((_) => Direction, (direction) => direction.recipe)
  directions: Direction[];

  @OneToMany((_) => Photo, (photo) => photo.recipe)
  photos: Photo[];

  @OneToOne((_) => RecipeMetadata, (metadata) => metadata.recipe)
  metadata: RecipeMetadata;
}
