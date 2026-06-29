export const ROUTES = {
  home: '/',
  signIn: '/signin',
  signUp: '/signup',
  recommended: '/recommended',
} as const;

export const PUBLIC_ROUTES = [ROUTES.home, ROUTES.signIn, ROUTES.signUp] as const;

export const PRIVATE_ROUTES = [ROUTES.recommended] as const;

export const AUTH_ROUTES = [ROUTES.signIn, ROUTES.signUp] as const;
