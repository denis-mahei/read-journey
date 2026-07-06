import { NextRequest, NextResponse } from 'next/server';
import { backendApi } from '@/app/api/api';
import { handleApiError } from '@/app/api/utils';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('Authorization');
  if (!auth) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 },
    );
  }

  const searchParams = req.nextUrl.searchParams;
  if (!searchParams) return null;

  const status = searchParams.get('status');

  try {
    const { data } = await backendApi.get('/books/own', {
      headers: {
        Authorization: auth,
      },
      params: {
        status,
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    return handleApiError(err);
  }
}
