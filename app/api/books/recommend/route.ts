import { NextRequest, NextResponse } from 'next/server';
import { backendApi } from '@/app/api/api';
import { AxiosResponse } from 'axios';
import { handleApiError } from '@/app/api/utils';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('Authorization');

  const searchParams = req.nextUrl.searchParams;

  const page = searchParams.get('page');
  const perPage = searchParams.get('limit');
  const title = searchParams.get('title');
  const author = searchParams.get('author');

  try {
    const { data } = await backendApi.get<AxiosResponse>(
      '/books/recommend',
      {
        headers: auth
          ? { Authorization: auth }
          : { 'Content-Type': 'application/json' },
        params: { page, limit: perPage, title, author },
      },
    );
    return NextResponse.json(data);
  } catch (e) {
    return handleApiError(e);
  }
}
