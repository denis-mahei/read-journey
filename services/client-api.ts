import axios from 'axios';
import {
  AuthResponse,
  SignInRequest,
  SignUpRequest,
} from '@/types/types';

const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  withCredentials: true,
});

export const signUp = async (data: SignUpRequest) => {
  try {
    const res = await clientApi.post<AuthResponse>(
      '/auth/register',
      data,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
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
