import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
  UploadedFiles
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './recipe.dto';
import { multerOption } from '../core';
import { AuthType } from 'src/enums';
import { CurrentUser, CurrentUserInfo } from '../auth/user.decorator';
import { FilesDto } from 'src/photo/photo.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) { }

  // Create a recipe
  @Post()
  @UseGuards(AuthGuard(AuthType.JWT))
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: "image", maxCount: 1 },
      { name: "photos", maxCount: 4 }
    ],
    multerOption
  ))
  async createRecipe(
    @CurrentUser() user: CurrentUserInfo,
    @Body() recipe: RecipeDto,
    @UploadedFiles() files: FilesDto) {
    return await this.recipeService.create(user, recipe, files);
  }

  @Get()
  async getRecipes() {
    return await this.recipeService.findAll();
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'image',
          maxCount: 1
        },
        {
          name: 'photos',
          maxCount: 4
        }
      ]
    )
  )
  async updateRecipes(@Request() request: any, @UploadedFiles() files) {
    const { params: { id }, body } = request;
    const payload = { ...body, files };
    return await this.recipeService.update(id, payload);
  }
}
