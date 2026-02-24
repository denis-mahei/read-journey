import {parse} from 'cookie';
import {ReadonlyRequestCookies} from 'next/dist/server/web/spec-extension/adapters/request-cookies';

// Це допоміжна функція яку ми будемо використовувати в кількох Route Handlers
// Щоб не дублювати один і той самий код в register/route.ts, login/route.ts і т.д.

// Що вона робить:
// 1. Отримує заголовок set-cookie з відповіді стороннього API
// 2. Парсить його (він приходить як рядок типу "accessToken=abc123; Path=/; HttpOnly; Max-Age=900")
// 3. Записує токени у cookies браузера через cookieStore

export const setCookiesFromResponse = async (
	setCookie: string | string[] | undefined,
	cookieStore: ReadonlyRequestCookies
) => {
	if (!setCookie) return false;

	// API може повернути один cookie або масив cookies
	// Примусово робимо масив щоб завжди працювати однаково
	const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

	for (const cookieStr of cookieArray) {
		// parse() перетворює рядок "accessToken=abc; Path=/; Max-Age=900"
		// на об'єкт { accessToken: 'abc', Path: '/', 'Max-Age': '900' }
		const parsed = parse(cookieStr);

		const options = {
			expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
			path: parsed.Path ?? '/',
			maxAge: parsed[ 'Max-Age' ] ? Number(parsed[ 'Max-Age' ]) : undefined,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		};

		// Встановлюємо токени якщо вони є у відповіді
		if (parsed.accessToken) {
			cookieStore.set('accessToken', parsed.accessToken, options);
		}
		if (parsed.refreshToken) {
			cookieStore.set('refreshToken', parsed.refreshToken, options);
		}
	}

	return true;
};