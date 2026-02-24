import {api} from "@/lib/api";

export interface SignUpData {
	name: string;
	email: string;
	password: string;
}

export interface SignInData {
	email: string;
	password: string;
}

export interface AuthResponse {
	user: {
		id: string;
		name: string;
		email: string;
	};
	// token і refreshToken більше не потрібні в body —
	// бекенд встановлює їх через httpOnly Set-Cookie
}

export const authApi = {
	signUp: async ( data: SignUpData ): Promise<AuthResponse> => {
		const response = await api.post("/users/signup", data);
		return response.data;
	},

	signIn: async ( data: SignInData ): Promise<AuthResponse> => {
		const response = await api.post("/users/signin", data);
		return response.data;
	},

	signOut: async (): Promise<void> => {
		await api.post("/users/signout");
	},

	getCurrentUser: async () => {
		const response = await api.get("/users/current");
		return response.data;
	},

	refreshToken: async () => {
		const response = await api.get("/users/current/refresh");
		return response.data;
	},
};