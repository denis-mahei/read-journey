import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error?: string; message?: string }>;

export const getApiErrorMessage = (
  error: unknown,
  fallback = 'Something went wrong',
): string => {
  const apiError = error as ApiError;
  return (
    apiError.response?.data?.message ??
    apiError.response?.data?.error ??
    apiError.message ??
    fallback
  );
};

export const backendApi = axios.create({
  baseURL: process.env.API_BASE_URL,
});
