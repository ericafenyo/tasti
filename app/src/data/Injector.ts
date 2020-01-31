import UserRepository from './user/user.repository';
import { UserService, UserServiceImpl } from './user/user.service';
import { Service } from './Service';
import { RecipeService } from './recipe/recipe.service';

const userService: UserService = new UserServiceImpl();
export const User: UserService = new UserRepository(userService);
export const Recipe: Service = new RecipeService();
