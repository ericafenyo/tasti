import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { multerOption } from "../core"
import { UploadService } from './upload.service';
import { UploadDto } from './upload.dao';

@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService) { }

    @Post()
    @UseInterceptors(AnyFilesInterceptor(multerOption))
    async upload(@UploadedFiles() files: UploadDto[]) {
        return this.uploadService.invoke(files);
    }
}
