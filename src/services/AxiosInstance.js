import axios from 'axios';
import { ConfigApi } from './ConfigApi';

export const AxiosInstance = axios.create({
  baseURL: ConfigApi.baseURL,
  timeout: ConfigApi.timeout,
  headers: ConfigApi.headers
});