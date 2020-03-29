import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from 'src/profile/profile.entity';

@Module({
  imports: [  TypeOrmModule.forFeature([ User, Profile ]) ],
  providers: [ UserService],
  exports: [ UserService ],
  controllers: [ UserController ],
})
export class UserModule {}
