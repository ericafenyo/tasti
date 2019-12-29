import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
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

@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService, private metadataService: RecipeMetadataService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  async createRecipe(@Request() request: any, @UploadedFile() file) {
    const { user, body } = request;
    const imagePath = file? file.filename : "";
    const recipe: RecipeDto = { name: body.name, imagePath};

    console.log(file);
    return user;
    
    // return await this.recipeService.create(user.id, recipe);
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
