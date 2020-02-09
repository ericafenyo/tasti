import { Controller, Post, Request, Get, Param, Patch, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { RecipeService } from '../recipe/recipe.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthType } from 'src/enums';

@Controller('users')
export class UserController {
  constructor(private userService: UserService, private recipeService: RecipeService) {}

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

  /**
   * Returns all following for a particular user;
   * @param {String} userId - the user's id
   */
  @Get(':id/followers')
  async getFollowers(@Param('id') userId: string) {
    return await this.userService.getFollowers(userId);
  }

  /**
   * Returns all following for a particular user;
   * @param {String} userId - the user's id
   */
  @Get(':id/following')
  async getFollowing(@Param('id') userId: string) {
    return await this.userService.getFollowing(userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard(AuthType.JWT))
  async updateProfile(@Request() request, @Param('id') profileId: string) {
    const { user, body } = request;
    return this.userService.updateProfile(profileId, user.id, body);
  }

  @Post('/create')
  async createAccount(@Request() request) {
    return await this.userService.create(request.body);
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
