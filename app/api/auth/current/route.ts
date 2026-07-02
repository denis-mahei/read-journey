import { NextRequest, NextResponse } from 'next/server';
import {
  ApiError,
  backendApi,
  getApiErrorMessage,
} from '@/app/api/api';
import { handleApiError } from '@/app/api/utils';

export async function GET(req: NextRequest) {
  const authorization = req.headers.get('Authorization');

  if (!authorization) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const res = await backendApi.get('/users/current', {
      headers: {
        Authorization: authorization,
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return handleApiError(error);
  }
}
