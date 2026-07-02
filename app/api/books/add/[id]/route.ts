import { NextRequest, NextResponse } from 'next/server';
import { backendApi } from '@/app/api/api';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const auth = req.headers.get('Authorization');

  try {
    const { id } = await context.params;

    const { data } = await backendApi.post(`/books/add/${id}`, null, {
      headers: {
        Authorization: auth,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to add book' },
      { status: 500 },
    );
  }
}
