'use client';

import {useEffect} from 'react';
import {checkSession, getMe} from '@/lib/api/clientApi';
import {useAuthStore} from '@/lib/store/authStore';

type Props = {
	children: React.ReactNode;
};

// AuthProvider живе у root layout і виконується при кожному завантаженні сторінки
// Його завдання: перевірити чи є активна сесія і якщо так — завантажити дані юзера

const AuthProvider = ( { children }: Props ) => {
	const setUser = useAuthStore(( state ) => state.setUser);
	const clearIsAuthenticated = useAuthStore(( state ) => state.clearIsAuthenticated);

	useEffect(() => {
		const fetchUser = async () => {
			// Крок 1: перевіряємо чи сесія валідна
			// checkSession → /api/auth/session → перевіряє accessToken або оновлює через refreshToken
			const isAuthenticated = await checkSession();

			if (isAuthenticated) {
				// Крок 2: якщо сесія є — отримуємо дані користувача
				// і записуємо у глобальний стан
				const user = await getMe();
				if (user) setUser(user);
			} else {
				// Сесії немає — чистимо стан (на випадок якщо щось залишилось)
				clearIsAuthenticated();
			}
		};

		fetchUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Просто рендеримо дітей — провайдер не додає жодного DOM елемента
	return <>{children}</>;
};

export default AuthProvider;