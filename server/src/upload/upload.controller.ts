import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

import S3 = require('aws-sdk/clients/s3');
import multer = require('multer');
import multerS3 = require('multer-s3');
import uuid = require('uuid/v4');
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const multerOption: MulterOptions = {
    storage: multerS3({
        s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        key: (request, file, callback) => {
            console.log(file);
            const extension = file.mimetype.split('/')[1];
            callback(null, `${uuid()}.${extension}`)
        }
    })
}
@Controller('upload')
export class UploadController {
    constructor(private uploadService : UploadService){}
    @Post()
    // @UseGuards(AuthGuard(AuthType.JWT))
    @UseInterceptors(FileFieldsInterceptor([{ name: "files", maxCount: 5 }], multerOption))
    async upload(@UploadedFiles() files) {
        return await this.uploadService.save(files);
    }
}
