import { Service } from '../Service';
import { buildRequest, http, authHttp } from '../ConnectionHelper';
import { ObjectLiteral } from '@/types';
import { AxiosPromise } from 'axios';
import { RecipeUiModel } from './recipe.model';
import { Result } from '../Result';

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

  create(requestBody: ObjectLiteral): Promise<Result> {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    return buildRequest(() => authHttp.post('/recipes', requestBody, config));
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
