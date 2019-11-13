import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

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

}
