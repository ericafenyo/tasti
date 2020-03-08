import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
  NotImplementedException,
  Logger,
  ForbiddenException,
  UnauthorizedException,
  BadRequestException
} from '@nestjs/common';
import { Recipe } from './recipe.entity';
import { Repository, Connection } from 'typeorm';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { RecipeDto } from './recipe.dto';
import { User } from '../user/user.entity';
import { Ingredient } from 'src/ingredient/ingredient.entity';
import { IngredientDto } from 'src/ingredient/ingredient.dto';
import { Direction } from 'src/direction/direction.entity';

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
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Ingredient) private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Direction) private directionRepository: Repository<Direction>,
    @InjectConnection() private connection: Connection
  ) { }

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
      relations: ['photos', 'ingredients', 'directions', 'metadata', 'owner', 'owner.profile']
    });

    return recipes;
  }

  /**
   * 
   * @param id 
   * @param payload 
   */
  async update(id: string, payload: any) {
    const { files, ...rest } = payload;
    return this.connection.transaction(async (manager) => {
      try {
        const recipe = await this.recipeRepository.findOne({
          where: { id },
          relations: ['ingredients']
        });

        if (!recipe) {
          throw new NotFoundException();
        }

        // Manage Ingredients
        const rawIngredients = payload.ingredients || [];
        const ingredientList: IngredientDto[] = rawIngredients.map((ingredient) => ({
          ...ingredient, recipe
        }));

        const ingredients = this.ingredientRepository.create(ingredientList);
        this.connection.manager.createQueryBuilder()
          .insert()
          .into(Ingredient)
          .values(ingredients)
          .orUpdate({ conflict_target: 'id', overwrite: ['name'] })
          .execute();

        // Manage Directions
        const rawDirections = payload.directions || [];
        const directionList: IngredientDto[] = rawDirections.map((direction) => ({
          ...direction, recipe
        }));

        const directions = this.directionRepository.create(directionList);
        this.connection.manager.createQueryBuilder()
          .insert()
          .into(Direction)
          .values(directions)
          .orUpdate({ conflict_target: 'id', overwrite: ['text'] })
          .execute();

        return { updated: "azerty" };
      } catch (error) {
        console.log('Error while updating recipe ', error);
        throw new BadRequestException();
      }
    });
  }

  async delete(id: string) {
    throw new NotImplementedException();
  }
}

