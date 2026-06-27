import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import {
  AuthResponse,
  CurrentResponse,
  SignInRequest,
  SignUpRequest,
} from '@/types/types';
import { useAuthStore } from '@/store/auth-store';

const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

clientApi.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig => {
    const isPublicAuthRoute =
      config.url === '/auth/register' || config.url === '/auth/login';
    const token = useAuthStore.getState().token;
    if (token && config.headers && !isPublicAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  },
);

export const signUp = async (data: SignUpRequest) => {
  const res = await clientApi.post<AuthResponse>('/auth/register', data);
  return res.data;
};

export const signIn = async (data: SignInRequest) => {
  try {
    const res = await clientApi.post<AuthResponse>(
      '/auth/login',
      data,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const current = async () => {
  try {
    const res = await clientApi.get<CurrentResponse>('/auth/current');
    return res.data;
  } catch (error) {
    throw error;
  }
};
