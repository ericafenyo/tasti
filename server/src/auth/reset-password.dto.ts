import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export default class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  confirmPassword: string;
}
