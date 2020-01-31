import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
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

  /**
   * Updates the user's profile information
   * @param {String} profileId the id of the profile
   * @param {String} userId  the user's id
   * @param {ProfileDto} profileDto an object containing the updated information
   */
  async updateProfile(profileId: string, userId: string, profileDto: ProfileDto) {
    const oldProfile = this.profileRepository.find({ id: profileId });
    const updatedProfile = this.profileRepository.create({ ...oldProfile, ...profileDto });
    return await this.profileRepository.update(profileId, updatedProfile);
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async findById(profileId: string) {
    const user = await this.userRepository.findOne({
      where: { id: profileId },
      relations: [ 'profile' ]
    });

    const { email, recipeCount, profile: { id, followersCount, followingCount, ...profileRemains } } = user;

    return { stats: { recipeCount, followersCount, followingCount }, profile: { email, ...profileRemains } };

    // if (!user) {
    //   throw new NotFoundException("method exists, but no record found");
    // }
    // return user;
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
