import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {api} from '../../api';
import {setCookiesFromResponse} from '../../cookieUtils';

// Цей ендпоінт перевіряє чи сесія користувача ще активна
// Він викликається з AuthProvider при кожному завантаженні сторінки

export async function GET() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('accessToken')?.value ?? cookieStore.get('token')?.value;
	const refreshToken = cookieStore.get('refreshToken')?.value;

	// Якщо accessToken є — сесія валідна, не потрібно йти до API
	// accessToken живе 15 хвилин, поки він є — все добре
	if (accessToken) {
		return NextResponse.json({ success: true });
	}

	// accessToken протух (зник автоматично після Max-Age)
	// але є refreshToken (він живе довше, наприклад 7 днів)
	// Пробуємо оновити сесію через /users/current/refresh
	if (refreshToken) {
		try {
			const apiRes = await api.get('/users/current/refresh', {
				headers: {
					// Передаємо refreshToken вручну бо це серверний запит
					Cookie: cookieStore.toString(),
				},
			});

			// Бекенд повернув нові токени — зберігаємо їх
			const setCookie = apiRes.headers[ 'set-cookie' ];
			const cookiesWereSet = await setCookiesFromResponse(setCookie, cookieStore);

			if (cookiesWereSet) {
				return NextResponse.json({ success: true });
			}
		} catch {
			// refreshToken теж протух або невалідний
		}
	}

	// Немає жодного токена — користувач не авторизований
	return NextResponse.json({ success: false });
}