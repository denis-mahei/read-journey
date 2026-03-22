import {NextResponse} from 'next/server';
import {api, ApiError, getAuthHeaders} from '../../api';

// Приватний ендпоінт — повертає дані поточного користувача
// Використовується в AuthProvider після checkSession

export async function GET() {
	try {
		const { data } = await api.get('/users/current', {
			headers: await getAuthHeaders(),
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