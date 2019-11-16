import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	async findOne(email: string) {
		const user = await this.userRepository.findOne({ email });
		return user;
	}

	async find() {
		return this.userRepository.find();
	}

	encryptPassword(password: string) {
		return bcrypt.hash(password, saltRounds);
	}

	async create(user: User) {
		const hashedPassword = await this.encryptPassword(user.password);
		const { password, ...result } = user;
		const userConstruct = { password: hashedPassword, ...result };

		try {
			const response = await this.userRepository.insert(userConstruct);
		} catch (error) {
      throw UnauthorizedException
    }
	}
}
