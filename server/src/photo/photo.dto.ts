import { Recipe } from "src/recipe/recipe.entity";

export interface UploadedFile {
    encoding: string;
    mimetype: string;
    size: number;
    key: string;
}
export class FilesDto {
    image: UploadedFile[];
    photos: UploadedFile[];
}