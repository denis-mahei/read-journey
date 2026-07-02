import { NextRequest, NextResponse } from 'next/server';
import { backendApi } from '@/app/api/api';

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

  const { data } = await backendApi.get('/books/own', {
    headers: {
      Authorization: auth,
    },
    params: {
      status,
    },
  });

  return NextResponse.json(data);
}
