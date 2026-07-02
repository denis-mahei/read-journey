import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { backendApi } from '@/app/api/api';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('Authorization');
  if (!auth) {
    return NextResponse.json(
      { error: 'No token provided' },
      { status: 401 },
    );
  }

  try {
    const { data } = await backendApi.get('/users/current/refresh', {
      headers: {
        Authorization: auth,
      },
    });
    return NextResponse.json(data);
  } catch (e) {
    const status = axios.isAxiosError(e)
      ? (e.response?.status ?? 500)
      : 500;
    const message = axios.isAxiosError(e)
      ? (e.response?.data?.message ?? 'Refresh failed')
      : 'Unexpected error';
    return NextResponse.json({ error: message }, { status });
  }
}
