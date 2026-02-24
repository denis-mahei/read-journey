'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useAuthStore} from '@/lib/store/authStore';
import {signOut} from '@/lib/api/clientApi';

const AuthNavigation = () => {
	const router = useRouter();
	const { isAuthenticated, user } = useAuthStore();
	const clearIsAuthenticated = useAuthStore(( state ) => state.clearIsAuthenticated);

	const handleLogout = async () => {
		// 1. Запит до /api/auth/signout → Route Handler видалить cookies
		await signOut();
		// 2. Чистимо глобальний стан
		clearIsAuthenticated();
		// 3. Редірект на логін
		router.push('/signin');
	};

	// Показуємо різний UI залежно від стану авторизації
	return isAuthenticated ? (
		<li>
			<span>{user?.email}</span>
			<button onClick={handleLogout}>Вийти</button>
		</li>
	) : (
		<>
			<li><Link href="/login">Увійти</Link></li>
			<li><Link href="/register">Реєстрація</Link></li>
		</>
	);
};

export default AuthNavigation;