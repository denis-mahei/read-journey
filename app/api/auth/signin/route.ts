import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {api, ApiError} from '@/app/api/api';

// Логіка ідентична signup — тільки ендпоінт інший (/users/signin)

export async function POST( req: NextRequest ) {
	// Читаємо дані які надіслав браузер (email, password, name)
	const body = await req.json();

	try {
		// Робимо запит до стороннього API вже з нашого сервера
		// Сервер → сервер = немає CORS обмежень
		const apiRes = await api.post('/users/signin', body);
		const cookieStore = await cookies();

		const { token, refreshToken, ...user } = apiRes.data;


		cookieStore.set('accessToken', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 15,
			path: '/',
		});

		cookieStore.set('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7,
			path: '/',
		});

		// Повертаємо тільки дані юзера без токенів
		return NextResponse.json(user);

	} catch (error) {
		const err = error as ApiError;
		return NextResponse.json(
			{ error: err.response?.data?.error ?? err.response?.data?.message ?? err.message },
			{ status: err.response?.status ?? 500 }
		);
	}
}