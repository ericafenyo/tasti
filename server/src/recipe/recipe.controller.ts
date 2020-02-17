import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecipeService } from './recipe.service';
import { RecipeMetadataService } from '../recipe-metadata/recipe-metadata.service';
import { RecipeDto } from './recipe.dto';
import { multerOption } from '../core';
import { AuthType } from 'src/enums';

@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService, private metadataService: RecipeMetadataService) {}

  @Post()
  @UseGuards(AuthGuard(AuthType.JWT))
  @UseInterceptors(FileInterceptor('image', multerOption))
  async createRecipe(@Request() request: any, @UploadedFile() file) {
    const { user, body: { name } } = request;
    const imagePath =
      file ? file.key :
      '';
    const recipe: RecipeDto = { name, imagePath };
    console.log(recipe);
    
    return await this.recipeService.create(user.id, recipe);
  }

  @Post(':id/metadata')
  async createRecipeMetadata(@Body() body: any, @Param('id') recipeId: string) {
    return await this.metadataService.create(recipeId, body);
  }

  @Get(':id')
  async getRecipeId(@Param('id') userId: string) {
    return await this.recipeService.find(userId);
  }

  @Get()
  async getRecipes() {
    return await this.recipeService.findAll();
  }
}
