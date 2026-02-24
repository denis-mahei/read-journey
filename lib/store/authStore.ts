import {create} from 'zustand';
import {User} from '../api/clientApi';

// Глобальний стан авторизації
// Zustand — це як useState але доступний з будь-якого компонента без передачі пропсів

type AuthStore = {
	isAuthenticated: boolean; // чи залогінений користувач
	user: User | null;        // дані користувача
	setUser: ( user: User ) => void;          // викликається після логіну/реєстрації
	clearIsAuthenticated: () => void;       // викликається після логауту
};

export const useAuthStore = create<AuthStore>(( set ) => ( {
	isAuthenticated: false,
	user: null,

	// Записуємо користувача і одразу ставимо isAuthenticated: true
	setUser: ( user: User ) => {
		set({ user, isAuthenticated: true });
	},

	// Очищаємо стан при виході
	clearIsAuthenticated: () => {
		set({ user: null, isAuthenticated: false });
	},
} ));