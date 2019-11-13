import { Injectable } from '@nestjs/common';

export interface User {
	email: string;
	username: string;
	name: string;
	password: string;
	state: string;
}

@Injectable()
export class UserService {
	private readonly users: User[];
	constructor() {
		this.users = [
			{
				email: 'name@example.com',
				username: 'admin',
				name: 'John Doe',
				password: 'password',
				state: 'active'
			}
		];
	}
	async findOne(username: string) {
		return this.users.find((user) => user.username === username);
	}
}
