import { CreatedResponse } from '@/types';

/**
 * A Service encapsulates methods used to access and mutate objects.
 * find, create, update, delete, etc.
 */
export interface Service {
  create(param?: any): any;
  find(): any;
  findOne(param: any): any;
}
