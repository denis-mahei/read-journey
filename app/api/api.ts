"use server"

import axios from 'axios';
import {cookies} from "next/headers";


export const nextServer = axios.create({
	baseURL: process.env.NEXT_PUBLIC_APP_URL + '/api',
	withCredentials: true,
});

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});


export type ApiError = {
	response?: {
		data?: {
			error?: string;
			message?: string;
		};
		status?: number;
	};
	message: string;
	status: number;
};


export const getAuthHeaders = async () => {
	const cookieStore = await cookies();
	return {
		Cookie: cookieStore.toString(),
	};
};