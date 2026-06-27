import { NextRequest, NextResponse } from 'next/server';
import { ApiError, backendApi, getApiErrorMessage } from '@/app/api/api';

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const apiRes = await backendApi.post('/users/signin', body);
    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    const status = (error as ApiError).response?.status ?? 500;
    return NextResponse.json(
      { error: getApiErrorMessage(error) },
      { status },
    );
  }
}
