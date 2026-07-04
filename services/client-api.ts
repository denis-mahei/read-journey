import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import {
  AuthResponse,
  BookDetails,
  CurrentResponse,
  GetRecommendedBooksParams,
  IBook,
  NewBook,
  RecommendedBooksResponse,
  SignInRequest,
  SignUpRequest,
  StartReadingParams,
} from '@/types/definitions';
import { useAuthStore } from '@/store/auth-store';
import { BookStatus } from '@/app/components/status-filter';
import page from '@/app/(auth)/signin/page';

const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

const refreshApi = axios.create({
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
// interceptors res:
let isRefreshing = false;

clientApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return clientApi(originalRequest);
      }

      isRefreshing = true;
      try {
        const newTokens = await refreshToken();
        useAuthStore
          .getState()
          .updateTokens(newTokens.token, newTokens.refreshToken);

        originalRequest.headers['Authorization'] =
          `Bearer ${newTokens.token}`;
        isRefreshing = false;
        return clientApi(originalRequest);
      } catch (e) {
        useAuthStore.getState().logout();
        isRefreshing = false;
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);

export const signUp = async (user: SignUpRequest) => {
  const { data } = await clientApi.post<AuthResponse>(
    '/auth/register',
    user,
  );
  return data;
};

export const signIn = async (user: SignInRequest) => {
  const { data } = await clientApi.post<AuthResponse>(
    '/auth/login',
    user,
  );
  return data;
};

export const current = async () => {
  const { data } =
    await clientApi.get<CurrentResponse>('/auth/current');
  return data;
};

export const refreshToken = async () => {
  const newToken = useAuthStore.getState().refreshToken;
  const { data } = await refreshApi.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${newToken}`,
    },
  });
  return data;
};

export const getRecommendedBooks = async ({
  page,
  perPage,
  title,
  author,
}: GetRecommendedBooksParams): Promise<RecommendedBooksResponse> => {
  const { data } = await clientApi.get<RecommendedBooksResponse>(
    '/books/recommend',
    {
      params: { page, limit: perPage, title, author },
    },
  );
  return data;
};

export const addBookFromRecommended = async (
  id: string,
): Promise<IBook> => {
  const { data } = await clientApi.post<IBook>(`/books/add/${id}`);
  return data;
};

export const getOwnLibrary = async (status?: BookStatus) => {
  const { data } = await clientApi.get<IBook[]>('/books/own', {
    params: { status },
  });

  return data;
};

export const addBook = async (book: NewBook) => {
  const { data } = await clientApi.post(`/books/add`, book);
  return data;
};

export const removeUsersBook = async (id: string) => {
  const { data } = await clientApi.delete(`/books/remove/${id}`);
  return data;
};

export const getBookById = async (id: string) => {
  const { data } = await clientApi.get<BookDetails>(`/books/${id}`);
  return data;
};

export const startReading = async ({
  id,
  page,
}: StartReadingParams) => {
  const { data } = await clientApi.post<BookDetails>(
    '/books/reading/start',
    {
      id,
      page,
    },
  );
  return data;
};
