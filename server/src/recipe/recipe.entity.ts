import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Recipe {
	@PrimaryGeneratedColumn('uuid') id: number;
	@Column() name: string;
  @Column() imagePath: string;
	@ManyToOne((type) => User, (user) => user.recipes, { nullable: false })
  user: User;
}
