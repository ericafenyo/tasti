import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
  NotImplementedException,
  Logger,
  ForbiddenException,
  UnauthorizedException
} from '@nestjs/common';
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
      Logger.log(error);
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
  async create(userId: string, recipeDto: RecipeDto) {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new UnauthorizedException();
    }

    const recipe = this.recipeRepository.create({ ...recipeDto, owner: user });
    const { id, createdAt } = await this.recipeRepository.save(recipe);
    return { id, createdAt };
  }

  /**
   * Returns all recipes created by a particular user.
   * @param {String} id the user Id;
   */
  async findOne(id: string, userId: string) {
    const recipe = await this.recipeRepository.findOne();
  }

  /**
   * Returns all recipes created by a particular user.
   * @param {String} id the user Id;
   */
  async findAll() {
    const recipes = await this.recipeRepository.find({
      relations: [ 'photos', 'ingredients', 'directions', 'metadata', 'owner', 'owner.profile' ]
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
