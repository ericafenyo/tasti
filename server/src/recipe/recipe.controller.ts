import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecipeService } from './recipe.service';
import { RecipeMetadataService } from '../recipe-metadata/recipe-metadata.service';

@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService, private metadataService: RecipeMetadataService) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('image'))
  async createRecipe(@Body() body, @Param('id') userId: string, @UploadedFile() file) {
    const recipe = { ...body, imagePath: file.filename };

    return await this.recipeService.create(userId, recipe);
  }

  @Post(':id/metadata')
  async createRecipeMetadata(@Body() body: any, @Param('id') recipeId: string) {
    return await this.metadataService.create(recipeId, body);
  }

  @Get(':id')
  async getRecipes(@Param('id') userId: string) {
    return await this.recipeService.find(userId);
  }
}
