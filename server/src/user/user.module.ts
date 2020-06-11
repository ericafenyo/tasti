import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from '../profile/profile.entity';
import { Credential } from '../auth/credential.entity';
import { Recipe } from '../recipe/recipe.entity';

@Module({
  imports: [  TypeOrmModule.forFeature([ User, Profile, Credential, Recipe ]) ],
  providers: [ UserService],
  exports: [ UserService ],
  controllers: [ UserController ],
})
export class UserModule {}
