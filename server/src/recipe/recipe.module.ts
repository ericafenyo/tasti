import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { Direction } from '../direction/direction.entity';
import { UserModule } from '../user/user.module';
import { Photo } from '../photo/photo.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Recipe, Ingredient, Direction, Photo])
  ],

  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService]
})
export class RecipeModule { }
