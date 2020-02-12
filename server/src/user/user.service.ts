import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException
} from '@nestjs/common';
import { InjectRepository, InjectEntityManager, InjectConnection } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Connection, EntityManager } from 'typeorm';
import { UserDto } from './user.dto';
import { Profile } from 'src/profile/profile.entity';
import { ProfileDto } from 'src/profile/profile.dto';
import { Validator } from 'class-validator';
import { MysqlError } from 'src/enums/mysql.error.enum';

// TODO: Inject this as a dependency
const validator = new Validator();

const bcrypt = require('bcrypt');
const saltRounds = 14;

@Injectable()
export class UserService {
  /**
   * 
   * @param email 
   * @param password 
   */
  async resetPassword(email: string, password: string) {
    // Retrieves the use's old password using the provided email
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('password')
      .addSelect('user.password')
      .where('email = :email', { email })
      .getOne();

    // Throw an error if no record is found for the email address
    if (validator.isEmpty(user.password)) {
      throw new BadRequestException('No account found for this email address');
    }

    // Throw an error if the user enters the same password as the new reset password
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched) {
      throw new ForbiddenException('You cannot user an old password');
    }

    // Proceed and prepare the password to be inserted into the database.
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updated =
      (await this.userRepository
        .createQueryBuilder('user')
        .update()
        .set({ password: hashedPassword })
        .where('user.email=:email', { email })
        .execute()) || {};

    if (validator.isNotEmptyObject(updated)) {
      return { updatedAt: new Date().toISOString() };
    }
  }

  async getSimpleUser(email: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('email = :email', { email })
      .getOne();
  }
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectConnection() private connection: Connection
  ) {}

  handleError(error: any) {
    if (error.errno && error.errno === MysqlError.DUPLICATE_ENTRY) {
      throw new ConflictException('User email already exist');
    } else {
      return error;
    }
  }

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

  /**
   * Creates a new User resource. 
   * In addition, a user profile is generated with addition information.
   * @param { UserDto } userDto - an object containing user information
   */
  async create(userDto: UserDto) {
    return this.connection.transaction(async (manager) => {
      try {
        // Separate and encrypt the user password using the bcrypt library.
        // The idea is not to store the original password but a hashed version using complex algorithms
        const { password, ...result } = userDto;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // build the user entity from the above objects
        const user = this.userRepository.create({ password: hashedPassword, ...result });
        // finally save the user entity
        const savedUser = await manager.save(user);

        // Build a profile entity
        const profileObj = { name: `${userDto.firstName} ${userDto.lastName}` };
        const profile = this.profileRepository.create({ ...profileObj, user: savedUser });
        // finally save the profile entity
        const savedProfile = await manager.save(profile);

        // Return relevant information
        const { id, joinedAt, user: { email } } = savedProfile;
        return { id, createdAt: joinedAt, email };
      } catch (error) {
        console.log('Error while creating a user ', error);
        this.handleError(error);
      }
    });
  }
}
