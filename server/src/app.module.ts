import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientModule } from './ingredient/ingredient.module';
import { DirectionModule } from './direction/direction.module';
import { RecipeMetadataModule } from './recipe-metadata/recipe-metadata.module';
import { ProfileModule } from './profile/profile.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(),
    IngredientModule,
    DirectionModule,
    RecipeMetadataModule,
    ProfileModule,
    PhotoModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
