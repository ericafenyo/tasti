import { Module } from '@nestjs/common';
import { RecipeMetadataController } from './recipe-metadata.controller';
import { RecipeMetadataService } from './recipe-metadata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeMetadata } from './recipe-metadata.entity';
import { Recipe } from '../recipe/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeMetadata, Recipe])],
  controllers: [ RecipeMetadataController ],
  providers: [ RecipeMetadataService ],
  exports: [ RecipeMetadataService ],
})
export class RecipeMetadataModule {}
