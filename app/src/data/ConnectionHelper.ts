import axios, { AxiosInstance } from 'axios';
import { Observable, from } from 'rxjs';
import { Result } from './Result';

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

// TODO: Pass object options
export const invokeHttpRequest = (block: () => Promise<any>): Observable<Result> =>
  new Observable((observer) => {
    observer.next(Result.Loading());
    block()
      .then((response) => {
        console.log(response);
        
        observer.next(Result.Success(response.data));
        observer.complete();
      })
      .catch((error) => {
        console.error(error)
        observer.next(Result.Error(error));
        observer.complete();
      });
  });
