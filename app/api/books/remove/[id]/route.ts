import { NextRequest, NextResponse } from 'next/server';
import { backendApi } from '@/app/api/api';
import { handleApiError } from '@/app/api/utils';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = req.headers.get('authorization');
  if (!auth) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 },
    );
  }
  try {
    const { id } = await params;
    const { data } = await backendApi.delete(`/books/remove/${id}`, {
      headers: {
        Authorization: auth,
      },
    });
    return NextResponse.json(data);
  } catch (e) {
    return handleApiError(e);
  }
}
