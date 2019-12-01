import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column()
  name: string;

  @Column() 
  bio: string;

  @Column() 
  avatarPath: string;

  @Column() 
  gender: string;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;
}
