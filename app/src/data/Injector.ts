import { UserService, UserServiceImpl } from './user/user.service';
import { Service } from './Service';
import { RecipeService } from './recipe/recipe.service';

export const User: UserService = new UserServiceImpl();
export const Recipe: Service = new RecipeService();
