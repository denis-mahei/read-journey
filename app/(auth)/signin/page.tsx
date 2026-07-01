'use client';

import React, { useState } from 'react';
import AuthWrapper from '@/app/ui/auth-wrapper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/services/client-api';
import { getApiErrorMessage } from '@/app/api/api';
import { ROUTES } from '@/constants/routes';
import { SignInRequest } from '@/types/definitions';
import { useAuthStore } from '@/store/auth-store';
import { useForm } from 'react-hook-form';
import Button from '@/app/ui/button';
import EmailField from '@/app/ui/email-field';
import PasswordField from '@/app/ui/password-field';

const SignInPage = () => {
  const form = useForm<SignInRequest>({
    mode: 'onTouched',
  });

  const { handleSubmit } = form;

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: SignInRequest) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const formValues: SignInRequest = {
        email: (data.email as string).trim(),
        password: data.password as string,
      };

      const res = await signIn(formValues);
      useAuthStore.getState().authenticate(res);
      router.push(ROUTES.recommended);
    } catch (error) {
      setError(
        getApiErrorMessage(error, 'Oops... Something went wrong.'),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 min-h-68"
      >
        <EmailField form={form} />
        <PasswordField form={form} />
        <div className="flex items-center gap-x-3.5 mt-auto">
          <Button>Login</Button>
          <Link
            href={ROUTES.signUp}
            className="text-xs underline text-gray-text"
          >
            Don&apos;t have an account?
          </Link>
        </div>
      </form>
      {error && <p>{error}</p>}
    </AuthWrapper>
  );
};

export default SignInPage;
