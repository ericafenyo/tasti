import { UserService } from './user.service';

export default class UserRepository implements UserService {
  constructor(private userService: UserService) {}
  profile(){
    return this.userService.profile();
  };
  
  createAccount(user: any) {
    return this.userService.createAccount(user);
  }

  async authenticate(username: string, password: string) {
    return await this.userService.authenticate(username, password);
  }
}
