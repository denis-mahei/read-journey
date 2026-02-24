import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {api, ApiError} from '../../api';

// Приватний ендпоінт — повертає дані поточного користувача
// Використовується в AuthProvider після checkSession

export async function GET() {
	const cookieStore = await cookies();

	try {
		const { data } = await api.get('/users/current', {
			headers: {
				// Обов'язково передаємо cookies — без них API не знає хто робить запит
				Cookie: cookieStore.toString(),
			},
		});

		return NextResponse.json(data);
	} catch (error) {
		const err = error as ApiError;
		return NextResponse.json(
			{ error: err.response?.data?.error ?? err.message },
			{ status: err.response?.status ?? 500 }
		);
	}
}