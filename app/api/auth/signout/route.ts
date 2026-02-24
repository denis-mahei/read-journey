import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {api} from '@/app/api/api';

export async function POST() {
	const cookieStore = await cookies();

	try {
		await api.post('/users/signout', {}, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});
	} catch {
		// Навіть якщо API повернув помилку — все одно чистимо cookies
		// Бо користувач хоче вийти, і ми маємо це зробити на клієнті
	} finally {
		cookieStore.delete('accessToken');
		cookieStore.delete('refreshToken');
	}

	return NextResponse.json({ message: 'Logged out successfully' });
}