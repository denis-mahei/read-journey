import { NextRequest, NextResponse } from 'next/server';
import { ApiError, backendApi } from '@/app/api/api';

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const apiRes = await backendApi.post('/users/signin', body);
    return apiRes.data;
  } catch (error) {
    return NextResponse.json({
      error:
        (error as ApiError).response?.data?.error ??
        (error as ApiError).message,
    });
  }
}
