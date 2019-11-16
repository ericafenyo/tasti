import axios, { AxiosInstance } from 'axios';

// The API server URL that will be used for the HTTP request.
const BASE_URL = 'http://localhost:2700/';

export const instance: AxiosInstance = axios.create({ baseURL: BASE_URL });
