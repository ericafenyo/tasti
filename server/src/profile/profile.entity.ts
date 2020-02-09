import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
  RelationCount,
  JoinColumn,
  RelationId
} from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  avatarPath: string;

  @Column({ default: '' })
  gender: string;

  @Column({ default: '' })
  occupation: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @RelationId((profile: Profile) => profile.user)
  userId: string;

  @ManyToMany(() => Profile, (profile) => profile.following)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => Profile, (profile) => profile.followers)
  following: User[];

  @RelationCount((profile: Profile) => profile.followers)
  followersCount: number;

  @RelationCount((profile: Profile) => profile.following)
  followingCount: number;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
