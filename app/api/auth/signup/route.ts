import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {api, ApiError} from '../../api';
import {setCookiesFromResponse} from '../../cookieUtils';

// Цей файл — це Route Handler
// Він живе на сервері Next.js і виконується коли браузер робить POST /api/auth/signup
// Браузер НЕ знає про сторонній API — він спілкується тільки з нашим Next.js

export async function POST( req: NextRequest ) {
	// Читаємо дані які надіслав браузер (email, password, name)
	const body = await req.json();

	try {
		// Робимо запит до стороннього API вже з нашого сервера
		// Сервер → сервер = немає CORS обмежень
		const apiRes = await api.post('/users/signup', body);

		// Отримуємо cookieStore — це інструмент Next.js для роботи з cookies
		const cookieStore = await cookies();

		// Сторонній API відповів і у відповіді є заголовок set-cookie
		// Він виглядає приблизно так:
		// "accessToken=eyJhb...; Path=/; Max-Age=900; HttpOnly"
		const setCookie = apiRes.headers[ 'set-cookie' ];

		// Викликаємо нашу допоміжну функцію яка розпарсить set-cookie
		// і запише токени у cookies браузера
		const cookiesWereSet = await setCookiesFromResponse(setCookie, cookieStore);

		if (cookiesWereSet) {
			// Повертаємо дані користувача браузеру
			return NextResponse.json(apiRes.data);
		}

		// Якщо API не повернув cookies — щось пішло не так
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	} catch (error) {
		// Якщо сторонній API повернув помилку (наприклад email вже існує)
		// передаємо цю помилку браузеру
		const err = error as ApiError;
		return NextResponse.json(
			{ error: err.response?.data?.error ?? err.response?.data?.message ?? err.message },
			{ status: err.response?.status ?? 500 }
		);
	}
}