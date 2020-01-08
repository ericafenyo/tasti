import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinTable, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';
import { Profile } from '../profile/profile.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => Recipe, (recipe) => recipe.owner)
  recipes: Recipe[];

  @OneToOne(type => Profile)
  @JoinColumn()
  profile: Profile;
}
