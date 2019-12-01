import { Injectable, NotFoundException, HttpStatus, HttpException, NotImplementedException } from '@nestjs/common';
import { Recipe } from './recipe.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeDto } from './recipe.dto';
import { User } from '../user/user.entity';

@Injectable()
export class RecipeService {
  async findById(userId: string) {
    try {
      const recipe = this.recipeRepository.findOne(userId);
      if (!recipe) {
        throw new NotFoundException();
      }
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  /**
   * Creates and save a new Recipe Entity into the database.
   * @param { String } id a user Id;
   * @param  recipeDto a RecipeDto object;
   */
  async create(id: string, recipeDto: RecipeDto) {
    const user = await this.userRepository.findOne({ id });
    const recipe = await this.recipeRepository.create({ ...recipeDto, owner: user });

    this.recipeRepository.save(recipe);
    return recipe;
  }

  /**
   * Returns all recipes created by a particular user.
   * @param {String} id the user Id;
   */
  async find(id: string) {
    const recipes = await this.recipeRepository.find({
      where: { user: { id } },
      relations: [ 'owner', 'photos', 'ingredients', 'directions', 'metadata' ]
    });

    return recipes;
  }

  async update(id: string, body: any) {
    throw new NotImplementedException();
  }

  async delete(id: string) {
    throw new NotImplementedException();
  }
}
