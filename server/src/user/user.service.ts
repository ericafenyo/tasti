import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { Profile } from 'src/profile/profile.entity';
import { ProfileDto } from 'src/profile/profile.dto';
import { Validator } from 'class-validator';

// TODO: Inject this as a dependency
const validator = new Validator();

const bcrypt = require('bcrypt');
const saltRounds = 20;

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

  /**
   * 
   * @param {String} email - the users email address;
   */
  async findOne(email: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('email = :email', { email })
        .getOne();

      if (validator.isEmpty(user)) {
        throw new NotFoundException();
      }

      return user;
    } catch (error) {
      console.log(JSON.stringify(error));
      throw new NotFoundException();
    }
  }

  /**
   * 
   * @param userId 
   */
  async findById(userId: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: [ 'profile', 'profile.following', 'profile.followers' ]
      });

      if (validator.isEmpty(user)) {
        throw new NotFoundException('method exists, but no record found');
      }

      const { email, recipeCount, profile: { id, followersCount, followingCount, ...profileRemains } } = user;
      return { stats: { recipeCount, followersCount, followingCount }, profile: { email, ...profileRemains } };
    } catch (error) {}

    // console.log(profileId);
  }

  async getFollowers(userId: string) {
    try {
      const user = await this.userRepository.findOne({
        select: [ 'id' ],
        where: { id: userId },
        relations: [ 'profile', 'profile.followers' ]
      });

      if (validator.isEmpty(user)) {
        throw new NotFoundException('method exists, but no record found');
      }
      const { id, profile: { followers } } = user;
      return { id, followers };
    } catch (error) {}
  }

  async getFollowing(userId: string) {
    try {
      const user = await this.userRepository.findOne({
        select: [ 'id' ],
        where: { id: userId },
        relations: [ 'profile', 'profile.followers' ]
      });

      if (validator.isEmpty(user)) {
        throw new NotFoundException('method exists, but no record found');
      }
      const { id, profile: { following } } = user;
      return { id, following };
    } catch (error) {}
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
