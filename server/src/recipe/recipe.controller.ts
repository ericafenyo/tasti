import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	NotFoundException,
	BadRequestException,
	UseInterceptors,
	UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';

@Controller('recipes')
export class RecipeController {
	constructor(private recipeService: RecipeService) {}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	async create(@Body() recipe, @Param() params, @UploadedFile() file) {
		console.log(recipe);
		console.log(file);

		const recipeConstruct = { ...recipe, userId: params.userId };
		try {
			// const result = await this.recipeService.create(recipeConstruct);
			// console.log(result);
			// if (!result) {
			// 	throw new NotFoundException();
			// }
		} catch (error) {
			console.log(error);
			throw new BadRequestException();
		}
	}
}
