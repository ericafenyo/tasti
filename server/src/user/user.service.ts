import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
  NotImplementedException
} from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Connection } from 'typeorm';
import { UserDto } from './user.dto';
import { Profile } from '../profile/profile.entity';
import { ProfileDto } from '../profile/profile.dto';
import { isNotEmptyObject, isEmpty } from 'class-validator';
import { MysqlError } from '../enums/mysql.error.enum';
import { Credential } from '../auth/credential.entity';
import { Recipe } from '../recipe/recipe.entity';

const bcrypt = require('bcrypt');
const saltRounds = 14;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Credential) private credentialRepository: Repository<Credential>,
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectConnection() private connection: Connection
  ) {}

  /**
   * Returns a simple user object {@link User}
   * @param id the users id
   */
  async getSimpleUserById(id: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email'])
      .where('user.id = :id', { id })
      .getOne();
  }

  /**
   * Return a registered {@link User}
   * @param userId the users id
   * @param email the users email
   */
  async getCurrentUser(userId: string, email: any) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .andWhere('email = :email', { email })
      .getOne();
  }
  /**
   * Update the users password
   * @param email the users email
   * @param password the users new password
   */
  async resetPassword(email: string, password: string) {
    // Retrieves the use's old password using the provided email
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.credential', 'credential')
      .where('email = :email', { email })
      .getOne();

    // Throw an error if no record is found for the email address
    if (isEmpty(user)) {
      throw new BadRequestException('No account found for this email address');
    }

    // Throw an error if the user enters the same password as the new reset password
    const passwordMatched = await bcrypt.compare(password, user.credential.password);
    if (passwordMatched) {
      throw new ForbiddenException('You cannot use an old password');
    }

    // Proceed and prepare the password to be inserted into the database.
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const credential = this.credentialRepository.create({ password: hashedPassword });
    const updated = await this.credentialRepository.update({ id: user.credential.id }, credential);

    if (isNotEmptyObject(updated)) {
      return { updated: updated };
    }
  }

  async getSimpleUser(email: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.credential', 'credential')
      .where('email = :email', { email })
      .getOne();
  }

  handleError(error: any) {
    if (error.errno) {
      if (error.errno === MysqlError.DUPLICATE_ENTRY) {
        throw new ConflictException('User email already exist');
      } else {
        throw new InternalServerErrorException(error.sqlMessage);
      }
    } else {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates the user's profile information
   * @param {String} userId  the user's id
   * @param {ProfileDto} profileDto an object containing the updated information
   */
  async updateProfile(userId: string, profileDto: ProfileDto) {
    throw new NotImplementedException();
    // const oldProfile = this.profileRepository.find({ id: profileId });
    // const updatedProfile = this.profileRepository.create({ ...oldProfile, ...profileDto });
    // return await this.profileRepository.update(profileId, updatedProfile);
  }

  /**
   * Get a single user
   *
   * @param {String} email - the user's email address;
   */
  async findOne(email: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.name',
          'user.email',
          'user.emailVerified',
          'credential.password',
          'profile.avatarPath'
        ])
        .leftJoin('user.credential', 'credential')
        .leftJoin('user.profile', 'profile')
        .where('email = :email', { email })
        .getOne();

      if (!isNotEmptyObject(user)) {
        throw new NotFoundException();
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.credential.password,
        emailVerified: user.emailVerified,
        avatarPath: user.profile.avatarPath
      };
    } catch (error) {
      console.log(error);
      throw new NotFoundException('user not found');
    }
  }

  /**
   * Get the uses profile information
   *
   * @param {String} userId the user's id
   */
  async findById(userId: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id=:userId', { userId })
        .leftJoinAndSelect('user.profile', 'profile')
        .getOne();

      if (!isNotEmptyObject(user)) {
        throw new NotFoundException('method exists, but no record found');
      }

      const {
        updatedAt,
        emailVerified,
        profile: { id, ...profileResult },
        ...userResult
      } = user;
      return { ...userResult, ...profileResult };
    } catch (error) {
      console.log(error);
    }
  }

  async findByIds(userId: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.id=:userId', { userId })
      .getOne();
  }

  async getFollowers(userId: string) {
    try {
      const user = await this.userRepository.findOne({
        select: ['id'],
        where: { id: userId },
        relations: ['profile', 'profile.followers']
      });

      if (!isNotEmptyObject(user)) {
        throw new NotFoundException('method exists, but no record found');
      }
      const {
        id,
        profile: { followers }
      } = user;
      return { id, followers };
    } catch (error) {}
  }

  async getFollowing(userId: string) {
    try {
      const user = await this.userRepository.findOne({
        select: ['id'],
        where: { id: userId },
        relations: ['profile', 'profile.followers']
      });

      if (!isNotEmptyObject(user)) {
        throw new NotFoundException('method exists, but no record found');
      }
      const {
        id,
        profile: { following }
      } = user;
      return { id, following };
    } catch (error) {}
  }

  async find() {
    return this.userRepository.find();
  }

  async findRecipes(userId: string) {
    return this.userRepository.createQueryBuilder('user')
      .getMany();
  }

  /**
   * Creates a new User resource.
   * In addition, a profile is generated for that particular user.
   *
   * @param { UserDto } userDto - an object containing the user's information
   */
  async create(userDto: UserDto) {
    return this.connection.transaction(async manager => {
      try {
        // Separate and encrypt the user password using the bcrypt library.
        // The idea is not to store the original password but a hashed version using complex algorithms
        const { password, firstName, lastName, email } = userDto;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // build the user credential entity
        const credential = this.credentialRepository.create({ password: hashedPassword });

        // Create an empty profile entity
        const profile = this.profileRepository.create();

        // Save the user entity
        const name = `${firstName} ${lastName}`;
        const user = this.userRepository.create({ name, email, credential, profile });
        const savedUser = await manager.save(user);

        return {
          id: savedUser.id,
          email: savedUser.email,
          createdAt: savedUser.createdAt
        };
      } catch (error) {
        console.log('Error while creating a user ', error);
        this.handleError(error);
      }
    });
  }
}
