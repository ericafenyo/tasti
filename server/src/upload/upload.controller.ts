import {Controller, Post, UseInterceptors, UploadedFiles, UseGuards} from '@nestjs/common';
import {AnyFilesInterceptor} from '@nestjs/platform-express';
import {multerOption} from '../core';
import {UploadService} from './upload.service';
import {UploadDto} from './upload.dao';
import {AuthGuard} from '@nestjs/passport';
import {AuthType} from 'src/enums';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseGuards(AuthGuard(AuthType.JWT))
  @UseInterceptors(AnyFilesInterceptor(multerOption))
  async upload(@UploadedFiles() files: UploadDto[]) {
    return this.uploadService.invoke(files);
  }
}
