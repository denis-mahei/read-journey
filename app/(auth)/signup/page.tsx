'use client';

import React, { useState } from 'react';
import AuthWrapper from '@/app/ui/auth-wrapper';
import Link from 'next/link';
import { signUp } from '@/services/client-api';
import { useRouter } from 'next/navigation';
import { getApiErrorMessage } from '@/app/api/api';
import { ROUTES } from '@/constants/routes';
import { SignUpRequest } from '@/types/types';
import { useAuthStore } from '@/store/auth-store';

const SignUpPage = () => {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const formValues: SignUpRequest = {
        name: (formData.get('name') as string).trim(),
        email: (formData.get('email') as string).trim(),
        password: formData.get('password') as string,
      };
      const res = await signUp(formValues);

      useAuthStore.getState().authenticate(res);

      router.push(ROUTES.recommended);
    } catch (error) {
      setError(getApiErrorMessage(error, 'Oops.. Something went wrong.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthWrapper>
      <h1>Registration</h1>
      <form action={handleSubmit} className="flex flex-col">
        <label>
          Username
          <input type="text" name="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
        <p>OR</p>
        <Link href={ROUTES.signIn}>Already have an account? Sign in</Link>
      </form>
      {error && <p>{error}</p>}
    </AuthWrapper>
  );
};

export default SignUpPage;
