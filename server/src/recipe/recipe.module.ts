import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { User } from '../user/user.entity';
import { RecipeMetadataModule } from '../recipe-metadata/recipe-metadata.module';
const generator = require('generate-password');

const path = require('path');
@Module({
  imports: [
    TypeOrmModule.forFeature([ Recipe, User ]),
    RecipeMetadataModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename(_, file, callback) {
          const baseName = generator.generate({
            length: 12,
            numbers: true,
            excludeSimilarCharacters: true,
          });
          const fileExtension = path.extname(file.originalname);
          callback(null, baseName + fileExtension);
        },
      }),
    }),
  ],

  controllers: [ RecipeController ],
  providers: [ RecipeService ],
  exports: [ RecipeService ]
})
export class RecipeModule {}
