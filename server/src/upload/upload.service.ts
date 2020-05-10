import {Injectable} from '@nestjs/common';
import {UploadDto} from './upload.dao';

@Injectable()
export class UploadService {
  invoke(files: UploadDto[]) {
    const result = {};
    const keys: string[] = [];
    files.forEach(({key, fieldname}) => {
      if (keys.indexOf(fieldname) == -1) {
        keys.push(fieldname);
        result[fieldname] = [];
        result[fieldname] = [...result[fieldname], key];
      } else {
        result[fieldname] = [...result[fieldname], key];
      }
    });

    return result;
  }
}
