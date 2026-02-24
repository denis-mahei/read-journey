'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {signUp, SignUpRequest} from '@/lib/api/clientApi';
import {useAuthStore} from '@/lib/store/authStore';
import {ApiError} from '@/app/api/api';

const SignUpPage = () => {
	const router = useRouter();
	const [error, setError] = useState('');
	// Беремо метод з глобального стора щоб записати юзера після реєстрації
	const setUser = useAuthStore(( state ) => state.setUser);

	// form action={handleSubmit} — це Next.js/React підхід
	// FormData автоматично збирає всі поля форми за атрибутом name
	const handleSubmit = async ( formData: FormData ) => {
		try {
			// Object.fromEntries перетворює FormData на звичайний об'єкт
			// { name: 'John', email: 'john@gmail.com', password: '12345678' }
			const formValues = Object.fromEntries(formData) as SignUpRequest;

			// Виклик йде до /api/auth/signup (наш Route Handler)
			// Route Handler вже сам іде до стороннього API і встановлює cookies
			const user = await signUp(formValues);

			if (user) {
				// Записуємо юзера у глобальний стан (Zustand)
				setUser(user);
				// Редірект на головну сторінку після реєстрації
				router.push('/recommended');
			}
		} catch (err) {
			setError(
				( err as ApiError ).response?.data?.error ??
				( err as ApiError ).response?.data?.message ??
				( err as ApiError ).message ??
				'Oops... щось пішло не так'
			);
		}
	};

	return (
		<div>
			<h1>Реєстрація</h1>
			{/* action замість onSubmit — Next.js патерн для роботи з FormData */}
			<form action={handleSubmit}>
				<label>
					Ім&#39;я
					{/* name="name" — це ключ у FormData */}
					<input type="text" name="name" required minLength={2}/>
				</label>
				<label>
					Email
					<input type="email" name="email" required/>
				</label>
				<label>
					Пароль
					<input type="password" name="password" required minLength={8}/>
				</label>
				<button type="submit">Зареєструватись</button>
			</form>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
};

export default SignUpPage;