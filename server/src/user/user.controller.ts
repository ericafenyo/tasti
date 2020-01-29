import {
  Controller,
  Post,
  Request,
  Get,
  ServiceUnavailableException,
  Param,
  Patch,
  Delete,
  ConflictException,
  UseGuards,
  Put
} from '@nestjs/common';
import { UserService } from './user.service';
import { MysqlError } from '../enums/mysql.error.enum';
import { RecipeService } from '../recipe/recipe.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthType } from 'src/enums';

@Controller('users')
export class UserController {
  constructor(private userService: UserService, private recipeService: RecipeService) {}

  handleSqlError(error: any) {
    switch (error.errno) {
      case MysqlError.DUPLICATE_ENTRY:
        throw new ConflictException('User email already exist');

      default:
        throw new ServiceUnavailableException();
    }
  }

  /**
   * Get a user's profile information.
   * @param userId the id of a particular {@link User}.
   */
  @Get(':id')
  async getProfileById(@Param('id') userId: string) {
    return await this.userService.findById(userId);
  }

  /**
   * 
   * @param {Object} request the Http request object
   */
  @Get()
  @UseGuards(AuthGuard(AuthType.JWT))
  async getProfile(@Request() request) {
    const { user } = request;
    return await this.userService.findById(user.id);
  }

  @Put()
  @UseGuards(AuthGuard(AuthType.JWT))
  async updateProfile(@Request() request){
    const { user, body } = request;
    return this.userService.updateProfile(user.id, body)
  }

  @Post('/new')
  async createAccount(@Request() request) {
    try {
      const user = await this.userService.create(request.body);
      if (!user) {
        throw new ServiceUnavailableException();
      }
      return user;
    } catch (error) {
      if (error.sql && error.errno) {
        this.handleSqlError(error);
      }
    }
  }

  // User recipes
  @Get(':id/recipes')
  async getRecipes(@Param('id') userId: string) {
    return await this.recipeService.find(userId);
  }

  @Patch(':id/recipes')
  updateRecipes(@Param('id') userId: string) {}

  @Delete(':id/recipes')
  deleteRecipes(@Param('id') userId: string) {}
}
