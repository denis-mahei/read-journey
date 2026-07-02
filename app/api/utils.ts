import axios from 'axios';
import { NextResponse } from 'next/server';

export function handleApiError(e: unknown) {
  const status = axios.isAxiosError(e)
    ? (e.response?.status ?? 500)
    : 500;
  const message = axios.isAxiosError(e)
    ? (e.response?.data?.message ?? 'Server error')
    : 'Unexpected error';
  return NextResponse.json({ error: message }, { status });
}
