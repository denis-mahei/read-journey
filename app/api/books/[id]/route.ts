import { NextRequest, NextResponse } from 'next/server';
import { backendApi } from '@/app/api/api';
import { handleApiError } from '@/app/api/utils';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const auth = req.headers.get('Authorization');
  if (!auth) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 },
    );
  }

  try {
    const { data } = await backendApi.get(`/books/${id}`, {
      headers: {
        Authorization: auth,
      },
    });
    return NextResponse.json(data);
  } catch (e) {
    return handleApiError(e);
  }
}
