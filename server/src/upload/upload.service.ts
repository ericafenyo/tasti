import { Injectable } from '@nestjs/common';
import S3 = require('aws-sdk/clients/s3');
// import * as multer from 'multer';
// const multerS3 =  require('multer-s3');
import * as uuid from 'uuid/v4';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const params = {};

@Injectable()
export class UploadService {
  constructor() {}
  async save({ files }) {
    const params = files.map((file) => ({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `photo-${uuid()}.${file.mimetype.split('/')[1]}`,
      Body: file.buffer
    }));

    return new Promise((resolve) => {
      params.forEach((param) => {
        s3.upload(param)
          .promise()
          .then((result) => {
            console.log(result);
            // resolve(result);
          })
          .catch((error) => {
            console.log(error);
            // resolve(error);
          });
      });
    });
  }
}
