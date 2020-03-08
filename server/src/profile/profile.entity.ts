import { Entity, Column, OneToOne, ManyToMany, JoinTable, RelationCount, JoinColumn, RelationId } from 'typeorm';
import { User } from '../user/user.entity';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Profile extends BaseEntity {
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
}
