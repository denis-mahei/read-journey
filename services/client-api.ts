import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import {
  AuthResponse,
  CurrentResponse,
  SignInRequest,
  SignUpRequest,
} from '@/types/definitions';
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
  const res = await clientApi.post<AuthResponse>(
    '/auth/register',
    data,
  );
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
    const { data } =
      await clientApi.get<CurrentResponse>('/auth/current');
    return data;
  } catch (error) {
    throw error;
  }
};

export const getRecommendedBooks = async ({
  page,
  perPage,
  title,
  author,
}: {
  page: number;
  perPage: number;
  title?: string;
  author?: string;
}) => {
  const response = await clientApi.get('/books/recommend', {
    params: { page, limit: perPage, title, author },
  });
  return response.data;
};
