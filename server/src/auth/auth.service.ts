import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, userPassword: string) {
    try {
      const user = await this.userService.findOne(username);
      console.log('login user ' + JSON.stringify(user));
      if (!user) {
        return null;
      }

      const passwordMatched = await bcrypt.compare(userPassword, user.password);
      if (passwordMatched) {
        return { sub: user.id, email: user.email };
      }

      return null;
    } catch (error) {}
  }

  async login({ email, sub }) {
    return { access_token: this.jwtService.sign({ email, sub }) };
  }
}
