import { CreatedResponse } from '@/types';

/**
 * A Service encapsulates methods used to access and mutate objects.
 * ind, create, update, delete, etc.
 */
export interface Service {
  create(param?: any): any;
  find(): any;
}
