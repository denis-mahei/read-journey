import {cookies} from 'next/headers';
import {api} from '@/lib/api/http';
import {RecommendedBooksResponse, User} from './clientApi';

const getServerAuthHeaders = async () => {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('accessToken')?.value ?? cookieStore.get('token')?.value;

	return {
		Cookie: cookieStore.toString(),
		...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
	};
};

export const checkServerSession = async () => {
	const res = await api.get('/users/current/refresh', {
		headers: await getServerAuthHeaders(),
	});
	return res;
};

export const getServerMe = async (): Promise<User> => {
	const { data } = await api.get<User>('/users/current', {
		headers: await getServerAuthHeaders(),
	});
	return data;
};

export const getRecommendedBooks = async () => {
	const { data } = await api.get<RecommendedBooksResponse>('/books/recommend', {
		headers: await getServerAuthHeaders(),
	});
	return data;
};
