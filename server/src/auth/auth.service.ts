import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt = require('bcrypt');
import { equals, isEmpty, isNotEmptyObject } from 'class-validator';
import AuthManager from './AuthManager';
import { CurrentUserInfo } from './user.decorator';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async resetPassword(email: string, password: string, confirmedPassword: string, token: string) {
    if (!equals(password, confirmedPassword)) {
      throw new BadRequestException('The passwords did not match');
    } else if (isEmpty(token)) {
      throw new BadRequestException('token cannot be empty');
    } else if (isEmpty(email)) {
      throw new BadRequestException('email cannot be empty');
    }

    // Obtain user email from the token
    // Retrieve the user using the email
    const user = await this.userService.getSimpleUser(email);

    const verifiedToken: any = AuthManager.verifyResetToken(token, user.credential.password);
    if (isNotEmptyObject(verifiedToken)) {
      return this.userService.resetPassword(email, password);
    }
  }

  /**
   * Return a registered {@link User}
   * @param id the users id
   */
  async getSimpleUserById(id: string) {
    return await this.userService.getSimpleUserById(id);
  }

  async validateUser(username: string, userPassword: string) {
    try {
      const user = await this.userService.findOne(username);
      const passwordMatched = await bcrypt.compare(userPassword, user.password);
      if (passwordMatched) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
          avatarPath: user.avatarPath
        };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get an access token
   *
   * @param { String } email the user's email
   * @param { String } sub the user's id
   */
  async getToken(user: CurrentUserInfo) {
    const payload = {
      sub: user.id,
      email_verified: user.emailVerified,
      name: user.name,
      avatar_path: user.avatarPath
    };
    return { access_token: this.jwtService.sign(payload) };
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

    if (isNotEmptyObject(user)) {
      // Email a reset link
      const messageId = await AuthManager.sendSecureEmil(email, user.credential.password);
      return { messageId: messageId, sentAt: new Date().toISOString() };
    }
    throw new NotFoundException('No resource found for this account');
  }
}
