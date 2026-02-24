import axios from 'axios';

// Цей інстанс використовується у КЛІЄНТСЬКИХ компонентах (браузер)
// baseURL вказує на наш же Next.js сервер (/api/...), а не на сторонній API
// Завдяки цьому браузер не робить запити напряму до стороннього домену
// → CORS проблема зникає
export const nextServer = axios.create({
	baseURL: 'http://localhost:3000/api',
	withCredentials: true, // axios буде автоматично передавати cookies
});

// Цей інстанс використовується ВСЕРЕДИНІ Route Handlers (Next.js сервер)
// Тут вже вказуємо реальний URL стороннього API
// Сервер-до-сервера запити не мають CORS обмежень
export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL, // наприклад https://твій-api.com
	withCredentials: true,
});

// Тип для обробки помилок axios
export type ApiError = {
	response?: {
		data?: {
			error?: string;
			message?: string;
		};
		status?: number;
	};
	message: string;
	status: number;
};