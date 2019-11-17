import { UserService } from './user.service';

export default class UserRepository implements UserService {
  constructor(private userService: UserService) {}

  createAccount(user: any) {
    try {
      const response = this.userService.createAccount(user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async authenticate(username: string, password: string) {
    return await this.userService.authenticate(username, password);
  }
}
