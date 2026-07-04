import { NextRequest, NextResponse } from 'next/server';
import { backendApi } from '@/app/api/api';
import { handleApiError } from '@/app/api/utils';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('Authorization');
  if (!auth) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 },
    );
  }
  try {
    const body = await req.json();
    const { data } = await backendApi.post(
      '/books/reading/finish',
      body,
      {
        headers: {
          Authorization: auth,
        },
      },
    );
    return NextResponse.json(data);
  } catch (err) {
    return handleApiError(err);
  }
}
