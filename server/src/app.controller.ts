import { Controller, Get, UseGuards, Post, Request, Param, Body, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import ResetPasswordDto from './auth/reset-password.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }

  @Post('auth/password/request-reset')
  async requestPasswordReset(@Body('email') userEmail: string) {
    return await this.authService.requestPasswordReset(userEmail);
  }

  @Post('auth/password/reset')
  async resetPassword(@Body() request: ResetPasswordDto, @Query('token') token: string) {
    return await this.authService.resetPassword(request.password, request.confirmPassword, token);
  }
}
