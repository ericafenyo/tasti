import {
  Injectable,
  NotFoundException,
  HttpException,
  NotImplementedException,
  Logger,
  BadRequestException
} from '@nestjs/common';
import { Recipe } from './recipe.entity';
import { Repository, Connection } from 'typeorm';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { RecipeDto } from './recipe.dto';
import { Ingredient } from '../ingredient/ingredient.entity';
import { IngredientDto } from '../ingredient/ingredient.dto';
import { Direction } from '../direction/direction.entity';
import { UserService } from '../user/user.service';
import { CurrentUserInfo } from '../auth/user.decorator';
import { Photo } from '../photo/photo.entity';
import { isArray } from 'class-validator';

export interface CreatedResource {
  id: string;
  createdAt: Date;
}

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
    private userService: UserService,
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectRepository(Ingredient) private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    @InjectRepository(Direction) private directionRepository: Repository<Direction>,
    @InjectConnection() private connection: Connection,
  ) { }

  /**
   * Creates a new Recipe resource.
   */
  async create(user: CurrentUserInfo, recipeDto: RecipeDto): Promise<any> {
    console.log(user);
    return this.connection.transaction(async (manager) => {
      try {
        const { ingredients, directions, photos, ...rest } = recipeDto;
        const owner = await this.userService.getCurrentUser(user.id, user.email);
        const recipe = this.recipeRepository.create({ owner, ...rest });
        await manager.save(recipe);

        // Build recipe photos
        const rawPhotos = isArray(photos) ? photos.map(photo => ({ path: photo, recipe })) : [];
        const photosEntities = this.photoRepository.create(rawPhotos);
        await manager.save(photosEntities);

        // Build recipe ingredients
        const rawIngredients = isArray(ingredients) ? ingredients.map(ingredient => ({ name: ingredient, recipe })) : [];
        const ingredientEntities = this.ingredientRepository.create(rawIngredients);
        await manager.save(ingredientEntities);
        
        // Build recipe directions
        const rawDirections = isArray(directions) ? directions.map(direction => ({ text: direction, recipe })) : [];
        const directionsEntities = this.directionRepository.create(rawDirections);
        await manager.save(directionsEntities);

        return { id: recipe.id, createdAt: recipe.createdAt };
      } catch (error) {
        console.log('Error while creating recipe ', error);
        throw HttpException.createBody(error);
      }
    })




    // const user = await this.userRepository.findOne({ id: userId });
    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    // const recipe = this.recipeRepository.create({ ...recipeDto, owner: user });
    // const { id, createdAt } = await this.recipeRepository.save(recipe);
    // return { id, createdAt };
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
      relations: ['photos', 'ingredients', 'directions', 'owner', 'owner.profile']
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

