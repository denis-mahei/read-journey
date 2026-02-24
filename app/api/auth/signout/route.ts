import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {api} from '../../api';

export async function POST() {
	const cookieStore = await cookies();

	try {
		// Повідомляємо сторонній API що користувач виходить
		// Передаємо cookies вручну бо це серверний запит
		// (браузер не може сам додати cookies до серверного запиту)
		await api.post('/users/signout', {}, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		});
	} catch {
		// Навіть якщо API повернув помилку — все одно чистимо cookies
		// Бо користувач хоче вийти, і ми маємо це зробити на клієнті
	} finally {
		// Видаляємо токени з браузера
		// Після цього браузер не буде відправляти їх у наступних запитах
		cookieStore.delete('accessToken');
		cookieStore.delete('refreshToken');
	}

	return NextResponse.json({ message: 'Logged out successfully' });
}