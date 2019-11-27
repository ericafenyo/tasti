import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
	imports: [
		TypeOrmModule.forFeature([ Recipe ]),
		MulterModule.register({
			dest: './uploads',
		}),
	],
	controllers: [ RecipeController ],
	providers: [ RecipeService ],
})
export class RecipeModule {}
