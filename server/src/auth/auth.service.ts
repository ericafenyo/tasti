import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt = require('bcrypt');
import { Validator } from 'class-validator';
import AuthManager from './AuthManager';

// TODO: Inject this as a dependency
const validator = new Validator();

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async resetPassword(email: string, password: string, confirmedPassword: string, token: string) {
    if (!validator.equals(password, confirmedPassword)) {
      throw new BadRequestException('The passwords did not match');
    } else if (validator.isEmpty(token)) {
      throw new BadRequestException('token cannot be empty');
    }
    else if (validator.isEmpty(email)) {
      throw new BadRequestException('email cannot be empty');
    }

    // Obtain user email from the token
    // Retrieve the user using the email
    const user = await this.userService.getSimpleUser(email)
    console.log(user);
    
    const verifiedToken: any = AuthManager.verifyResetToken(token, user.password);
    if (validator.isNotEmptyObject(verifiedToken)) {
      return this.userService.resetPassword(email, password);
    }
  }

  async validateUser(username: string, userPassword: string) {
    try {
      const user = await this.userService.findOne(username);
      if (!user) {
        return null;
      }

      const passwordMatched = await bcrypt.compare(userPassword, user.password);
      if (passwordMatched) {
        return { sub: user.id, email: user.email };
      }

      return null;
    } catch (error) { }
  }

  async login({ email, sub }) {
    return { id: sub, access_token: this.jwtService.sign({ email, sub }) };
  }

  /**
   * Sends a password-reset link to the provided email.
   * @param { String } email - the user's email address
   */
  async requestPasswordReset(email: string) {
    if (!email) {
      throw new BadRequestException('Email address is required');
    }

    // Retrieve the user's email from the datebase;
    const user = await this.userService.getSimpleUser(email);

    if (validator.isNotEmpty(user) && validator.isNotEmptyObject(user)) {
      // Email a reset link
      const messageId = await AuthManager.sendSecureEmil(email, user.password);
      return { messageId: messageId, sentAt: new Date().toISOString() };
    }
    throw new NotFoundException('No resource found for this account');
  }
}
