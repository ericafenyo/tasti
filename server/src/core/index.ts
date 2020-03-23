import S3 = require('aws-sdk/clients/s3');
import multerS3 = require('multer-s3');
import generateUUID = require('uuid/v4');
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const multerOption: MulterOptions = {
  storage: multerS3({
    s3,
    bucket: 'ns-tasti',
    key: (_, file, callback) => {
      const extension = 'png'
      callback(null, `${generateUUID().split('-').join('')}.${extension}`);
    }
  })
};
