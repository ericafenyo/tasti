import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, getConnection, getRepository } from 'typeorm';
import { UserDto } from './user.dto';
import { Profile } from 'src/profile/profile.entity';
import { ProfileDto } from 'src/profile/profile.dto';

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>
  ) {}

  async updateProfile(id: string, profileDto: ProfileDto) {
    const user = await getConnection()
        .createQueryBuilder()
        .select('*')
        .from(User, 'user')
        .getOne()
    return user;
    // const profile = this.profileRepository.create(profileDto);
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: [ 'profile' ]
    });

    // if (!user) {
    //   throw new NotFoundException("method exists, but no record found");
    // }
    return user;
  }

  async find() {
    return this.userRepository.find();
  }

  async create(userDto: UserDto) {
    const profileObj = { name: `${userDto.firstName} ${userDto.lastName}` };
    const profileEntity = this.profileRepository.create(profileObj);
    const profile = await this.profileRepository.save(profileEntity);
    const { password, ...result } = userDto;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = this.userRepository.create({ password: hashedPassword, ...result, profile });

    return await this.userRepository.save(user);

    // const { id, createdAt, email } = await this.userRepository.save(user);
    // return { id, createdAt, email };
  }
}
