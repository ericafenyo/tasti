import { IsString } from "class-validator";

export class UploadDto {
    @IsString()
    fieldname: string;
    @IsString()
    key: string;
}