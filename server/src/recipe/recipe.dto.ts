import { IsString, IsNotEmpty, IsArray, IsNumber, IsEmpty, IsOptional, IsNumberString } from 'class-validator';

export class RecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  facts?: string;

  @IsOptional()
  @IsNumberString()
  servings?: number;

  @IsOptional()
  @IsString()
  tags?: string;

  @IsOptional()
  @IsArray()
  ingredients?: string[]

  @IsOptional()
  @IsArray()
  directions?: string[];
}
