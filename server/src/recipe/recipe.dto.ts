import { IsString, IsNotEmpty, IsArray, IsNumber, IsEmpty, IsOptional, IsNumberString } from 'class-validator';

export class RecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  imagePath: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumberString()
  servings?: number;

  @IsString()
  @IsOptional()
  @IsNumberString()
  duration: number;

  @IsOptional()
  @IsArray()
  photos?: string[]

  @IsOptional()
  @IsArray()
  ingredients?: string[]

  @IsOptional()
  @IsArray()
  directions?: string[];
}
