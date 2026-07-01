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
}

export type AuthState = Omit<IAuthStore, 'authenticate' | 'logout'>;

export interface IBook {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
}
