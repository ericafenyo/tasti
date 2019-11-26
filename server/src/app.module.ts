import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { RecipeModule } from './recipe/recipe.module';

@Module({
	imports: [ AuthModule, UserModule, TypeOrmModule.forRoot(), RecipeModule ],
	controllers: [ AppController ],
	providers: [ AppService ]
})
export class AppModule {}
