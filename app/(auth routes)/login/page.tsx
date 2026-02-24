'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {signIn, SignInRequest} from '@/lib/api/clientApi';
import {useAuthStore} from '@/lib/store/authStore';
import {ApiError} from '@/app/api/api';

const SignInPage = () => {
	const router = useRouter();
	const [error, setError] = useState('');
	const setUser = useAuthStore(( state ) => state.setUser);

	const handleSubmit = async ( formData: FormData ) => {
		try {
			const formValues = Object.fromEntries(formData) as SignInRequest;
			const user = await signIn(formValues);

			if (user) {
				setUser(user);
				router.push('/recommended');
			}
		} catch (err) {
			setError(
				( err as ApiError ).response?.data?.error ??
				( err as ApiError ).response?.data?.message ??
				( err as ApiError ).message ??
				'Невірний email або пароль'
			);
		}
	};

	return (
		<div>
			<h1>Вхід</h1>
			<form action={handleSubmit}>
				<label>
					Email
					<input type="email" name="email" required/>
				</label>
				<label>
					Пароль
					<input type="password" name="password" required/>
				</label>
				<button type="submit">Увійти</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
};

export default SignInPage;