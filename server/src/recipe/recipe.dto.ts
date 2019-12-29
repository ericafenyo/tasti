import { IsString, IsNotEmpty } from 'class-validator';
import { Ingredient } from '../ingredient/ingredient.entity';
import { Direction } from '../direction/direction.entity';
import { Photo } from '../photo/photo.entity';
import { RecipeMetadata } from '../recipe-metadata/recipe-metadata.entity';

export class RecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  imagePath: string;

  ingredients?: Ingredient[];

  directions?: Direction[];

  photos?: Photo[];

  metadata?: RecipeMetadata;
}
