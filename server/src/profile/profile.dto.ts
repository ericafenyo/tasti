import { IsOptional, IsString } from "class-validator";

export class ProfileDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  occupation: string;

  @IsString()
  @IsOptional()
  avatarPath: string;

  @IsString()
  @IsOptional()
  gender: string;
}
