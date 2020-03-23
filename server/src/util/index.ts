import { Recipe } from "../recipe/recipe.entity";
import { Ingredient } from "src/ingredient/ingredient.entity";
import { IngredientDto } from "src/ingredient/ingredient.dto";
import { DirectionDto } from "src/direction/direction.dto";
import { UploadedFile } from "src/photo/photo.dto";

export const IngredientHelper = {
    buildList(ingredients: string[], recipe: Recipe): IngredientDto[] {
        const rawIngredients = ingredients || [];
        return rawIngredients.map((ingredient) => ({ name: ingredient, recipe: recipe }));
    }
}

export const DirectionsHelper = {
    buildList(directions: string[], recipe: Recipe): DirectionDto[] {
        const rawDirections = directions || [];
        return rawDirections.map((direction) => ({ text: direction, recipe: recipe }));

    }
}

const isValidArray = (array: any) => array && array.length;

export const PhotoHelper = {
    getImagePath(image: UploadedFile[]) {
        return isValidArray(image) ? image[0].key : ""
    },

    buildList(photos: UploadedFile[], recipe: Recipe) {
        return isValidArray(photos) ? photos.map(value => ({ path: value.key, recipe })) : []
    }
}