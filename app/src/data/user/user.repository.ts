import { UserService } from './user.service';

export default class UserRepository implements UserService {
	constructor(private userService: UserService) {}

	createUser(user: any) {
		try {
			const response = this.userService.createUser(user);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}
}
