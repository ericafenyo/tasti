import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') 
  id: number;

	@Column({ name: 'first_name' })
  firstName: string;
  
	@Column({ name: 'last_name' })
	lastName: string;

  @Column({unique : true}) 
  email: string;

  @Column() 
  password: string;

  @OneToMany(type => Recipe, recipe => recipe.user)
  recipes: Recipe[];
}