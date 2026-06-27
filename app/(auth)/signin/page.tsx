'use client';

import React, { useState } from 'react';
import AuthWrapper from '@/app/ui/auth-wrapper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/services/client-api';
import { getApiErrorMessage } from '@/app/api/api';
import { ROUTES } from '@/constants/routes';
import { SignInRequest } from '@/types/types';
import { useAuthStore } from '@/store/auth-store';

const SignInPage = () => {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const formValues: SignInRequest = {
        email: (formData.get('email') as string).trim(),
        password: formData.get('password') as string,
      };

      const res = await signIn(formValues);
      useAuthStore.getState().authenticate(res);
      router.push(ROUTES.recommended);
    } catch (error) {
      setError(getApiErrorMessage(error, 'Oops... Something went wrong.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthWrapper>
      <h1>Login</h1>
      <form action={handleSubmit} className="flex flex-col">
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        <p>OR</p>
        <Link href={ROUTES.signUp}>Don&apos;t have an account?</Link>
      </form>
      {error && <p>{error}</p>}
    </AuthWrapper>
  );
};

export default SignInPage;
