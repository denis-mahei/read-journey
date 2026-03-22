import {nextServer} from '@/lib/api/http';

export type User = {
	id: string;
	email: string;
	name: string;
	createdAt?: string;
};

export type RecommendedBook = {
	_id: string;
	title: string;
	author?: string;
	imageUrl?: string;
};

export type RecommendedBooksResponse = {
	results: RecommendedBook[];
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

export const signUp = async ( data: SignUpRequest ): Promise<User> => {
	const res = await nextServer.post<User>('/auth/signup', data);
	return res.data;
};

export const signIn = async ( data: SignInRequest ): Promise<User> => {
	const res = await nextServer.post<User>('/auth/signin', data);
	return res.data;
};

export const signOut = async (): Promise<void> => {
	await nextServer.post('/auth/signout');
};

export const checkSession = async (): Promise<boolean> => {
	const res = await nextServer.get<{ success: boolean }>('/auth/session');
	return res.data.success;
};

export const getMe = async (): Promise<User> => {
	const res = await nextServer.get<User>('/auth/me');
	return res.data;
};

export const getRecommendedBooks = async (): Promise<RecommendedBooksResponse> => {
	const res = await nextServer.get<RecommendedBooksResponse>('/books/recommend');
	return res.data;
};