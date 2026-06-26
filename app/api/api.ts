import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

export const backendApi = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
});
