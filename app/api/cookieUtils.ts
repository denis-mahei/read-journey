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
		const parts = cookieStr.split(';').map(( part ) => part.trim());
		if (parts.length === 0) continue;

		const [nameValue, ...attributes] = parts;
		const eqIndex = nameValue.indexOf('=');
		if (eqIndex === -1) continue;

		const cookieName = nameValue.slice(0, eqIndex);
		const cookieValue = nameValue.slice(eqIndex + 1);

		const attrs: Record<string, string | true> = {};
		for (const attr of attributes) {
			const attrEqIndex = attr.indexOf('=');
			if (attrEqIndex === -1) {
				attrs[attr.toLowerCase()] = true;
				continue;
			}
			const key = attr.slice(0, attrEqIndex).toLowerCase();
			const value = attr.slice(attrEqIndex + 1);
			attrs[key] = value;
		}

		const options = {
			expires: typeof attrs.expires === 'string' ? new Date(attrs.expires) : undefined,
			path: typeof attrs.path === 'string' ? attrs.path : '/',
			maxAge: typeof attrs[ 'max-age' ] === 'string' ? Number(attrs[ 'max-age' ]) : undefined,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		};

		// Встановлюємо токени якщо вони є у відповіді
		if (cookieName === 'accessToken' && cookieValue) {
			cookieStore.set('accessToken', cookieValue, options);
			cookieStore.set('token', cookieValue, options);
		}
		if (cookieName === 'refreshToken' && cookieValue) {
			cookieStore.set('refreshToken', cookieValue, options);
		}
	}

	return true;
};
