import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { multerOption } from './core';
import { RecipeModule } from './recipe/recipe.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    RecipeModule,
    MulterModule.register(multerOption),
    UploadModule
  ],
  controllers: [AppController],
})
export class AppModule { }
