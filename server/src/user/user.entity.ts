import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
  RelationCount
} from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';
import { Profile } from '../profile/profile.entity';
import { Credential } from '../auth/credential.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false, name: 'email_verified' })
  emailVerified: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Recipe, recipe => recipe.likes)
  @JoinTable({
    name: 'user_likes_recipe',
    joinColumn: {
      name: 'user_id'
    },

    inverseJoinColumn: {
      name: 'recipe_id'
    }
  })
  likedRecipes: Recipe[];

  @OneToMany(() => Recipe, recipe => recipe.owner, {
    cascade: true, onDelete: 'CASCADE'
  })
  recipes: Recipe[];

  @RelationCount((user: User) => user.recipes)
  recipeCount: number;

  @RelationCount((user: User) => user.likedRecipes)
  favoriteCount: number;

  @OneToOne(() => Profile, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToOne(() => Credential, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'credential_id' })
  credential: Credential;
}
