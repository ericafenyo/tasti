import UserRepository from './user/user.repository';
import { UserService, UserServiceImpl } from './user/user.service';

const userService: UserService = new UserServiceImpl();
export const userRepository: UserService = new UserRepository(userService);
