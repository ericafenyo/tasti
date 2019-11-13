import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('increment') 
  id: number;

  @Column() 
  username: string;

  @Column() 
  email: string;

  @Column() 
  password: string;

	@Column({ nullable: true })
  name: string;
  
	@Column({ nullable: true })
	state: string;
}
