import {cookies} from 'next/headers';
import {api} from '@/app/api/api';
import {User} from './clientApi';

// Ці функції використовуються на СЕРВЕРІ Next.js
// (у middleware, серверних компонентах, Route Handlers)
//
// Відмінність від clientApi: тут ми вручну передаємо cookies у headers
// бо на сервері браузер не може зробити це автоматично

export const checkServerSession = async () => {
	const cookieStore = await cookies();
	// Повний response (не тільки data) потрібен щоб дістати нові set-cookie заголовки
	const res = await api.get('/users/current/refresh', {
		headers: {
			Cookie: cookieStore.toString(),
		},
	});
	return res;
};

export const getServerMe = async (): Promise<User> => {
	const cookieStore = await cookies();
	const { data } = await api.get<User>('/users/current', {
		headers: {
			Cookie: cookieStore.toString(),
		},
	});
	return data;
};