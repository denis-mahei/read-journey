import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {api, ApiError} from '../../api';
import {setCookiesFromResponse} from '../../cookieUtils';

// Логіка ідентична signup — тільки ендпоінт інший (/users/signin)

export async function POST( req: NextRequest ) {
	const body = await req.json();

	try {
		const apiRes = await api.post('/users/signin', body);
		const cookieStore = await cookies();
		const setCookie = apiRes.headers[ 'set-cookie' ];

		const cookiesWereSet = await setCookiesFromResponse(setCookie, cookieStore);

		if (cookiesWereSet) {
			return NextResponse.json(apiRes.data);
		}

		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	} catch (error) {
		const err = error as ApiError;
		return NextResponse.json(
			{ error: err.response?.data?.error ?? err.response?.data?.message ?? err.message },
			{ status: err.response?.status ?? 500 }
		);
	}
}