import { Controller, Get, UseGuards, Post, Request, Param, Body, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import ResetPasswordDto from './auth/reset-password.dto';
import { CurrentUser, CurrentUserInfo } from './auth/user.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('auth/token')
  async login(@CurrentUser() user: CurrentUserInfo) {
    return this.authService.getToken(user);
  }

  @Post('auth/password/request-reset')
  async requestPasswordReset(@Body('email') userEmail: string) {
    return await this.authService.requestPasswordReset(userEmail);
  }

  @Post('auth/password/reset')
  async resetPassword(@Body() request: ResetPasswordDto, @Query() query: any) {
    const { token, email } = query;
    const { password, confirmPassword } = request;
    return await this.authService.resetPassword(email, password, confirmPassword, token);
  }
}
