import { CreatedResponse } from '@/types';

export interface Service{
  create(param?: any): CreatedResponse;
}
