import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { User } from '../user/user.entity';
import { RecipeMetadataModule } from '../recipe-metadata/recipe-metadata.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Recipe, User ]),
    RecipeMetadataModule
  ],

  controllers: [ RecipeController ],
  providers: [ RecipeService ],
  exports: [ RecipeService ]
})
export class RecipeModule {}
