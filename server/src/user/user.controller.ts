import { Controller, Post, Request, Get, Param, Patch, Delete, UseGuards, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthType } from 'src/enums';
import { UserDto } from './user.dto';
import { CurrentUser } from 'src/auth/user.decorator';
import { ProfileDto } from 'src/profile/profile.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  @UseGuards(AuthGuard(AuthType.JWT))
  async getProfile(@CurrentUser('id') userId: string) {
    return await this.userService.findById(userId);
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

  @Put()
  @UseGuards(AuthGuard(AuthType.JWT))
  async updateProfile(@CurrentUser('id') userId: string, @Body() body: ProfileDto) {
    return this.userService.updateProfile(userId, body);
  }

  @Post('create')
  async createAccount(@Body() user: UserDto) {
    return await this.userService.create(user);
  }

  @Patch(':id/recipes')
  updateRecipes(@Param('id') userId: string) { }

  @Delete(':id/recipes')
  deleteRecipes(@Param('id') userId: string) { }
}
