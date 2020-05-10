import { Entity, Column, OneToOne, ManyToMany, JoinTable, RelationCount, JoinColumn, RelationId, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: "" })
  bio: string;

  @Column({ default: "" })
  gender: string;

  @Column({ default: "" })
  occupation: string;

  @Column({ name: "avatar_path", default: "" })
  avatarPath: string;

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
