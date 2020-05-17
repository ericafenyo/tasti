import { Service } from '../Service';
import { buildRequest, authHttp, http } from '../ConnectionHelper';
import { AxiosPromise } from 'axios';
import { RecipeResponse } from './recipe.model';
import { Result } from '../Result';
import { HttpStatus } from '@/enums';

export class RecipeService implements Service {
  /**
   * Get a single recipe
   *
   * @param {String} id - the id of the recipe to fetch
   *
   * @returns a {@link Result} object containing the http status code and the data.
   */
  findOne(id: string) {
    return buildRequest(() => authHttp().get(`/recipes/${id}`));
  }

  private async upload(files: any) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return buildRequest(() => authHttp().post('/upload', files, config));
  }

  async create(payload: any): Promise<Result> {
    const { data, status } = await this.upload(payload.files);
    let requestModel = { ...payload.inputData };

    if (status === HttpStatus.CREATED) {
      const { image, photos } = data;
      requestModel = { ...requestModel, imagePath: image[0], photos };
    } else {
      requestModel = { ...requestModel, imagePath: '', photos: [] };
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return buildRequest(() =>
      authHttp().post('/recipes', requestModel, config)
    );
  }

  async find(): Promise<Result> {
    return buildRequest(() => http.get('/recipes'));
  }
}
