import { Service } from '../Service';
import { buildRequest, http, authHttp } from '../ConnectionHelper';
import { ObjectLiteral } from '@/types';
import { AxiosPromise } from 'axios';
import { RecipeUiModel } from './recipe.model';
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
    return buildRequest(() => authHttp.get(`/recipes/${id}`));
  }

  private async upload(files: any) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    return buildRequest(() => authHttp.post('/upload', files, config))
  }

  async create(payload: any): Promise<Result> {
    const { data, status } = await this.upload(payload.files);
    let requestModel = { ...payload.inputData }

    if (status === HttpStatus.CREATED) {
      console.log("image created");
      
      const { image, photos } = data;
      requestModel = { ...requestModel, image: image[0], photos }
    } else {
      requestModel = { ...requestModel, image: "", photos: [] }
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log("hit server " + requestModel);
    return buildRequest(() => authHttp.post('/recipes', requestModel, config));
  }

  find(): AxiosPromise<RecipeUiModel> {
    return authHttp.get('/recipes').then((response) =>
      response.data.map((element: any) => ({
        ...element,
        image: process.env.VUE_APP_IMAGE_BASE_URL + element.imagePath
      }))
    );
  }
}
