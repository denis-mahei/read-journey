import { BookStatus } from '@/app/components/status-filter';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest extends SignInRequest {
  name: string;
}

export interface User {
  name: string;
  email: string;
}

export interface AuthResponse extends User {
  token: string;
  refreshToken: string;
}

export interface CurrentResponse extends AuthResponse {
  _id: string;
}

export interface RefreshResponse {
  token: string;
  refreshToken: string;
}

export interface SignOutResponse {
  message: string;
}

export interface IAuthStore {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  logout: () => void;
  authenticate: (authData: AuthResponse) => void;
  updateTokens: (token: string, refreshToken: string) => void;
}

export interface RecommendedBooksResponse {
  results: IBook[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface GetRecommendedBooksParams {
  page: number;
  perPage: number;
  title?: string;
  author?: string;
}

export type AuthState = Omit<
  IAuthStore,
  'authenticate' | 'logout' | 'updateTokens'
>;

export interface IBook {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
}

export interface NewBook {
  title: string;
  author: string;
  totalPages: number;
}

export type StartReadingParams = {
  id: string;
  page: number;
};

interface Progress {
  startPage: number;
  startReading: string;
  finishPage?: number;
  finishReading?: string;
  speed?: number;
  status: 'active' | 'inactive';
}

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

export interface BookDetails {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status: BookStatus;
  owner: string;
  progress: Progress[];
  timeLeftToRead?: TimeLeft;
}
