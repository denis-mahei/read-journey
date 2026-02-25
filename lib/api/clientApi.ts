import {nextServer} from '@/app/api/api';

// Типи
export type User = {
	id: string;
	email: string;
	name: string;
	createdAt?: string;
};

export type SignUpRequest = {
	name: string;
	email: string;
	password: string;
};

export type SignInRequest = {
	email: string;
	password: string;
};

// Ці функції викликаються з КЛІЄНТСЬКИХ компонентів (браузер)
// Вони йдуть не напряму до стороннього API, а до наших Route Handlers (/api/auth/...)
// Саме тому немає CORS — браузер спілкується тільки з localhost:3000

export const signUp = async ( data: SignUpRequest ): Promise<User> => {
	// POST http://localhost:3000/api/auth/signup
	const res = await nextServer.post<User>('/auth/signup', data);
	return res.data;
};

export const signIn = async ( data: SignInRequest ): Promise<User> => {
	// POST http://localhost:3000/api/auth/signin
	const res = await nextServer.post<User>('/auth/signin', data);
	return res.data;
};

export const signOut = async (): Promise<void> => {
	await nextServer.post('/auth/signout');
};

export const checkSession = async (): Promise<boolean> => {
	// GET http://localhost:3000/api/auth/session
	const res = await nextServer.get<{ success: boolean }>('/auth/session');
	return res.data.success;
};

export const getMe = async (): Promise<User> => {
	const res = await nextServer.get<User>('/auth/me');
	return res.data;
};

export const getRecommendedBooks = async () => {
	const res = await nextServer.get('/books/recommend');
	return res.data;
};