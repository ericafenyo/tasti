import axios, { AxiosInstance } from 'axios';
import { Observable, from } from 'rxjs';
import { Result } from './Result';
import { HttpStatus } from '@/enums';

// The API server URL that will be used for the HTTP request.
const BASE_URL = 'http://localhost:2700/';

export const instance: AxiosInstance = axios.create({ baseURL: BASE_URL });
export const http: AxiosInstance = axios.create({ baseURL: BASE_URL });
// TODO: use html only cookies to store token
const userToken = localStorage.getItem('access_token') || null;

export const authHttp: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${userToken}`,
    'Content-Type': 'multipart/form-data'
  }
});

const handleError = (error: any) => {
  if (error.response) {
    return error.response;
  }

  return { status: HttpStatus.SERVICE_UNAVAILABLE, data: 'Service not available' };
};

/**
 * Wraps data in a {@link Result} object
 * @param {Function} block a function that returns a promise.
 * 
 * @returns returns a {@link Result} object.
 */
export const buildRequest = (block: () => Promise<any>): Promise<Result> =>
  new Promise((resolve) => {
    block()
      .then(({ status, data }) => {
        resolve(Result.create(status, data));
      })
      .catch((error) => {
        const { status, data } = handleError(error);
        resolve(Result.create(status, data));
      });
  });
