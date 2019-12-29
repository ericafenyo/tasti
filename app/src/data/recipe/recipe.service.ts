import { Service } from '../Service';
import { invokeHttpRequest, http, authHttp } from '../ConnectionHelper';
import { CreatedResponse, ObjectLiteral } from '@/types';

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
}
