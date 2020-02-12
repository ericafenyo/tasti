import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Validator, IsNotEmptyObject } from 'class-validator';
import AuthManager from './AuthManager';

// TODO: Inject this as a dependency
const validator = new Validator();

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async resetPassword(password: string, confirmedPassword: string, token: string) {
    
    if (!validator.equals(password, confirmedPassword)) {
      throw new BadRequestException('The passwords did not match');
    } else if (validator.isEmpty(token)) {
      throw new BadRequestException('token cannot be empty');
    }

    //TODO: resume from here
    this.userService.getSimpleUser("")

    const decodedToken: any = AuthManager.verifyResetToken(token, "");
    if (validator.isNotEmptyObject(decodedToken)) {
      return this.userService.resetPassword(decodedToken.sub, password);
    }
  }

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
    if (!email) {
      throw new BadRequestException('Email address is required');
    }

    // Retrieve the user's email from the datebase;
    const user = await this.userService.getSimpleUser(email);
    console.log(user);

    if (validator.isNotEmpty(user) && validator.equals(user.email, email)) {
      // The the account exists, email a reset link
      const messageId = await AuthManager.sendSecureEmil(email, user.password);
      return { messageId: messageId };
    }
    throw new NotFoundException('Account does not exist');
  }
}
