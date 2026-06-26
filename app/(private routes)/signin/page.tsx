'use client';

import React, { useState } from 'react';
import AuthWrapper from '@/app/ui/auth-wrapper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/services/client-api';
import { ApiError } from '@/app/api/api';
import { SignInRequest } from '@/types/types';

const SignInPage = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues: SignInRequest = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };

      const res = await signIn(formValues);
      if (res) {
        router.push('/recommended');
      } else {
        setError('Invalid Credentials');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... Something went wrong.',
      );
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
        <button type="submit">Login</button>
        <p>OR</p>
        <Link href="/signup">Don&apos;t have an account?</Link>
      </form>
      {error && <p>{error}</p>}
    </AuthWrapper>
  );
};

export default SignInPage;
