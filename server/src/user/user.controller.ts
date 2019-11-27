import { Controller, Post, Request, Get, ServiceUnavailableException, HttpException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { MysqlError } from '../enums/mysql.error.enum';

@Controller()
export class UserController {
	constructor(private userService: UserService) {}

	handleSqlError(error: any) {
		switch (error.errno) {
			case MysqlError.DUPLICATE_ENTRY:
				throw new BadRequestException('User email already exist');

			default:
				throw new ServiceUnavailableException();
		}
	}

	@Get()
	getUsers() {
		return this.userService.find();
	}

	@Post('auth/create')
	async createAccount(@Request() request) {
		console.log(request.body);
		try {
			const result = await this.userService.create(request.body);
			if (!result) {
				throw new ServiceUnavailableException();
			}
		} catch (error) {
			if (error.sql && error.errno) {
				this.handleSqlError(error);
			}
		}
	}
}
