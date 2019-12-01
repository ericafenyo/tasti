import {
  Controller,
  Post,
  Request,
  Get,
  ServiceUnavailableException,
  BadRequestException,
  Param,
  Patch,
  Delete
} from '@nestjs/common';
import { UserService } from './user.service';
import { MysqlError } from '../enums/mysql.error.enum';
import { RecipeService } from '../recipe/recipe.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService, private recipeService: RecipeService) {}

  handleSqlError(error: any) {
    switch (error.errno) {
      case MysqlError.DUPLICATE_ENTRY:
        throw new BadRequestException('User email already exist');

      default:
        throw new ServiceUnavailableException();
    }
  }

  /**
   * returns all users.
   */
  @Get()
  getUsers() {
    return this.userService.find();
  }

  /**
   * returns a user's profile.
   * @param userId the id of a particular {@link User}.
   */
  @Get(':id')
  getProfile(userId: string) {}

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
