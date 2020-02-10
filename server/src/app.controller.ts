import { Controller, Get, UseGuards, Post, Request, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { IsEmail } from 'class-validator';

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
  async requestPasswordReset(@Body('email') userEmail: string){
    this.authService.requestPasswordReset(userEmail)
  
  }
}
