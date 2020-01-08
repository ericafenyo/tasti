import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findOne(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async find() {
    return this.userRepository.find();
  }

  async create(userDto: UserDto) {
    const { password, ...result } = userDto;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userDTO = this.userRepository.create({ password: hashedPassword, ...result });
    
    const{id, createdAt } = await this.userRepository.save(userDTO);
    return {id, createdAt };
  }
}
