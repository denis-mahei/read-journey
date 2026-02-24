import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {parse} from 'cookie';
import {api} from './app/api/api';
import {setCookiesFromResponse} from './app/api/cookieUtils';

// Приватні маршрути — тільки для авторизованих
const privateRoutes = ['/recommended', '/profile'];

// Auth маршрути — тільки для НЕавторизованих
// Якщо авторизований юзер іде на /sign-in — редіректимо його на /recommended
const authRoutes = ['/login', '/register'];

// middleware виконується ДО того як сторінка рендериться
// Це найперший код який бачить запит користувача

export async function middleware( request: NextRequest ) {
	const { pathname } = request.nextUrl;
	const cookieStore = await cookies();

	const accessToken = cookieStore.get('accessToken')?.value;
	const refreshToken = cookieStore.get('refreshToken')?.value;

	const isPrivateRoute = privateRoutes.some(( route ) => pathname.startsWith(route));
	const isAuthRoute = authRoutes.some(( route ) => pathname.startsWith(route));

	// Сценарій 1: accessToken відсутній але є refreshToken
	// Спробуємо тихо оновити токени (silent refresh)
	if (!accessToken && refreshToken) {
		try {
			const apiRes = await api.get('/users/current/refresh', {
				headers: { Cookie: cookieStore.toString() },
			});

			const setCookie = apiRes.headers[ 'set-cookie' ];
			const cookiesWereSet = await setCookiesFromResponse(setCookie, cookieStore);

			if (cookiesWereSet) {
				// Токени оновлені — якщо це auth маршрут то редіректимо на головну
				if (isAuthRoute) {
					return NextResponse.redirect(new URL('/recommended', request.url), {
						headers: { Cookie: cookieStore.toString() },
					});
				}
				// Приватний маршрут — дозволяємо і передаємо нові cookies далі
				return NextResponse.next({
					headers: { Cookie: cookieStore.toString() },
				});
			}
		} catch {
			// refreshToken невалідний — йдемо далі без токенів
		}
	}

	// Сценарій 2: немає жодного токена
	if (!accessToken) {
		// Auth маршрут (/sign-in, /sign-up) — дозволяємо
		if (isAuthRoute) return NextResponse.next();

		// Приватний маршрут — редіректимо на логін
		if (isPrivateRoute) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	}

	// Сценарій 3: accessToken є
	// Auth маршрут — редіректимо бо вже залогінений
	if (isAuthRoute) {
		return NextResponse.redirect(new URL('/recommended', request.url));
	}

	// Все добре — пропускаємо запит далі
	return NextResponse.next();
}

export const config = {
	// middleware спрацьовує тільки для цих маршрутів
	// :path* означає що маршрут і всі його підмаршрути
	matcher: ['/recommended/:path*', '/profile/:path*', '/login', '/register'],
};