import { Entity, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, } from 'typeorm';
import { BaseEntity } from 'src/BaseEntity';
import { User } from '../user/user.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { Direction } from '../direction/direction.entity';
import { Photo } from '../photo/photo.entity';

@Entity()
export class Recipe extends BaseEntity {
  @Column() name: string;

  @Column({ default: "" }) description: string;

  @Column({ default: "" }) imagePath: string;

  @Column({ nullable: true }) servings: number;

  @Column({ default: "" }) facts: string;

  @Column({ default: "" }) tags: string;

  @CreateDateColumn() createdAt: Date;

  @ManyToOne(() => User, (user) => user.recipes, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  owner: User;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredients: Ingredient[];

  @OneToMany(() => Direction, (direction) => direction.recipe)
  directions: Direction[];

  @OneToMany(() => Photo, (photo) => photo.recipe)
  photos: Photo[];
}
