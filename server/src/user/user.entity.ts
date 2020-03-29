import { Entity, Column, OneToMany, OneToOne, RelationCount } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';
import { Profile } from '../profile/profile.entity';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../BaseEntity';
@Entity()
export class User extends BaseEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: false, select: false })
  password: string;

  @OneToMany(() => Recipe, (recipe) => recipe.owner)
  recipes: Recipe[];

  @RelationCount((user: User) => user.recipes)
  recipeCount: number;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;
}
