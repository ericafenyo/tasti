import axios, { AxiosInstance } from 'axios';
import { Result } from './Result';
import { HttpStatus } from '@/enums';
import { store } from '@/store';

// The API server URL that will be used for the HTTP request.
const BASE_URL = process.env.VUE_APP_API_BASE_URL;

export const http: AxiosInstance = axios.create({ baseURL: BASE_URL });

export const authHttp = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${store.getters["user/accessToken"]}`,
      'Content-Type': 'multipart/form-data'
    }
  })
};

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
