import { Injectable } from '@nestjs/common';
import { Recipe } from './recipe.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecipeService {
  constructor(@InjectRepository(Recipe) private recipeRepository: Repository<Recipe>) {}
  async create(recipe: Recipe) {
      const createdRecipe = this.recipeRepository.create(recipe);
      if (!createdRecipe) {
          
      }
  }
}
