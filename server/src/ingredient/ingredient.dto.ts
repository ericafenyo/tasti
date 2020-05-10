import { Recipe } from "src/recipe/recipe.entity";

export class IngredientDto {
  name: string;
  recipe: Recipe;
}