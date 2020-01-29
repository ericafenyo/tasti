import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToOne } from 'typeorm';
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

  @OneToOne((type) => User, (user) => user.profile)
  user: User;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;
}
