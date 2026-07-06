import { NextRequest, NextResponse } from 'next/server';
import { backendApi } from '@/app/api/api';
import { handleApiError } from '@/app/api/utils';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = req.headers.get('Authorization');

  try {
    const { id } = await params;

    const { data } = await backendApi.post(`/books/add/${id}`, null, {
      headers: {
        Authorization: auth,
      },
    });

    return NextResponse.json(data);
  } catch (err) {
    return handleApiError(err);
  }
}
