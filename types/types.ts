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
