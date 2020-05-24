import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { User } from '../user/user.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { Direction } from '../direction/direction.entity';
import { Photo } from '../photo/photo.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ name: 'image_path' })
  imagePath: string;

  @Column({ nullable: true })
  servings: number;

  @Column({ nullable: true })
  duration: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => User,
    user => user.recipes,
    { nullable: false }
  )
  @JoinColumn({ name: 'user_id' })
  owner: User;

  @ManyToMany(() => User, user=> user.likedRecipes)
  likes: User[];

  @OneToMany(() => Ingredient, ingredient => ingredient.recipe, {
    onDelete: 'CASCADE'
  })
  ingredients: Ingredient[];

  @OneToMany(() => Direction, direction => direction.recipe, {
    onDelete: 'CASCADE'
  })
  directions: Direction[];

  @OneToMany(() => Photo, photo => photo.recipe, {
    onDelete: 'CASCADE'
  })
  photos: Photo[];
}
