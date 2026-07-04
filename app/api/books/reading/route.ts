import { NextRequest, NextResponse } from 'next/server';
import { backendApi } from '@/app/api/api';
import { handleApiError } from '@/app/api/utils';

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get('Authorization');

  if (!auth) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 },
    );
  }

  const bookId = req.nextUrl.searchParams.get('bookId');
  const readingId = req.nextUrl.searchParams.get('readingId');

  try {
    const { data } = await backendApi.delete('/books/reading', {
      headers: {
        Authorization: auth,
      },
      params: {
        bookId,
        readingId,
      },
    });
    return NextResponse.json(data);
  } catch (err) {
    return handleApiError(err);
  }
}
