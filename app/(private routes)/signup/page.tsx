'use client';

import React, { useState } from 'react';
import AuthWrapper from '@/app/ui/auth-wrapper';
import Link from 'next/link';
import { signUp } from '@/services/client-api';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/app/api/api';
import { SignUpRequest } from '@/types/types';

const SignUpPage = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues: SignUpRequest = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };
      const res = await signUp(formValues);
      if (res) {
        router.push('/recommended');
      } else {
        setError('Invalid Credentials');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops.. Something went wrong.',
      );
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
        <button type="submit">Register</button>
        <p>OR</p>
        <Link href="/signin">Already have an account? Sign in</Link>
      </form>
      {error && <p>{error}</p>}
    </AuthWrapper>
  );
};

export default SignUpPage;
