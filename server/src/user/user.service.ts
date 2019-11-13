import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	async findOne(username: string) {
		const user = await this.userRepository.findOne({ username });
		console.log(user);
		return user;
	}

	async find() {
		return this.userRepository.find();
	}

	async create(user: User) {
		return this.userRepository.insert(user);
	}
}
