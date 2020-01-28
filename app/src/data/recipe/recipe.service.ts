import { Service } from '../Service';
import { invokeHttpRequest, http, authHttp } from '../ConnectionHelper';
import { CreatedResponse, ObjectLiteral } from '@/types';
import { AxiosResponse, AxiosPromise } from 'axios';
import { RecipeUiModel } from './recipe.model';

export class RecipeService implements Service {
  create(requestModel: ObjectLiteral): CreatedResponse {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    invokeHttpRequest(() => {
      return authHttp.post('/recipes', requestModel, config);
    }).subscribe((result) => {
      console.log(result);
    });

    return { id: '', createdAt: '' };
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
