import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RecipeModule } from '../recipe/recipe.module';

@Module({
  imports: [ RecipeModule, TypeOrmModule.forFeature([ User ]) ],
  providers: [ UserService ],
  exports: [ UserService ],
  controllers: [ UserController ]
})
export class UserModule {}
