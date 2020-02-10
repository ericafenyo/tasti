import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Validator } from 'class-validator';
import AuthManager from './AuthManager';

// TODO: Inject this as a dependency
const validator = new Validator();

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
    return { id: sub, access_token: this.jwtService.sign({ email, sub }) };
  }

  /**
   * Sends a password-reset link to the given email if it already exist
   * in the database.
   * @param { String } email an email address
   */
  async requestPasswordReset(email: string) {
   // Retrive the user email from the datebase;
  //  const storedEmail = await this.userService.getEmail(email);

   // The the account exists, email a reset link  
  //  if(validator.isNotEmpty(storedEmail)){
     AuthManager.sendSecureEmil(email);
  //  }
  }
}
