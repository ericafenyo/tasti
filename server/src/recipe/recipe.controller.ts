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
import { FileInterceptor, FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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

  // @Get(':id')
  // async getRecipeById(@Param('id') recipeId: string) {
  //   return await this.recipeService.findOne(recipeId);
  // }

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
