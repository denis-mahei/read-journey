import {AxiosError} from "axios";


export interface SignUpBody {
	name: string;
	email: string;
	password: string;
}

export interface SignUpResponse {
	name: string;
	email: string;
	token: string;
}

export interface SignInBody {
	email: string;
	password: string;
}

export interface SignInResponse {
	email: string;
	password: string;
	token: string;
}

// export type ApiError = AxiosError<{ error: string }>