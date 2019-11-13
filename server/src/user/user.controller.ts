import { Controller, Post, Request, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	getUsers() {
		return this.userService.find();
	}

	@Post('auth/create')
	async createAccount(@Request() request) {
		console.log(request.body);

		return this.userService.create(request.body);
	}
}
