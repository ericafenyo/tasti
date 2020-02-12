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

  async resetPassword(password: string, confirmedPassword: string, token: string) {

    if (!validator.equals(password, confirmedPassword)) {
      throw new BadRequestException('The passwords did not match');
    } else if (validator.isEmpty(token)) {
      throw new BadRequestException('token cannot be empty');
    }

    // Obtain user email from the token
    // TODO: use a `resetid` to retieve the email/token in order not to expose sensitive info 
    const decodedToken = AuthManager.decodeToken(token)
    if (!validator.isNotEmptyObject(decodedToken) && !decodedToken.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    // Retrieve the user using the email
    const user = await this.userService.getSimpleUser(decodedToken.sub)

    const verifiedToken: any = AuthManager.verifyResetToken(token, user.password);
    if (validator.isNotEmptyObject(verifiedToken)) {
      return this.userService.resetPassword(verifiedToken.sub, password);
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
