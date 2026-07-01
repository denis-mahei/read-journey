'use client';

import React, { useState } from 'react';
import AuthWrapper from '@/app/ui/auth-wrapper';
import Link from 'next/link';
import { signUp } from '@/services/client-api';
import { useRouter } from 'next/navigation';
import { getApiErrorMessage } from '@/app/api/api';
import { ROUTES } from '@/constants/routes';
import { SignUpRequest } from '@/types/definitions';
import { useAuthStore } from '@/store/auth-store';
import Button from '@/app/ui/button';
import { useForm } from 'react-hook-form';
import NameField from '@/app/ui/name-field';
import EmailField from '@/app/ui/email-field';
import PasswordField from '@/app/ui/password-field';

const SignUpPage = () => {
  const form = useForm<SignUpRequest>({
    mode: 'onTouched',
  });
  const { handleSubmit } = form;
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: SignUpRequest) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const formValues: SignUpRequest = {
        name: (data.name as string).trim(),
        email: (data.email as string).trim(),
        password: data.password as string,
      };
      const res = await signUp(formValues);

      useAuthStore.getState().authenticate(res);

      router.push(ROUTES.recommended);
    } catch (error) {
      setError(
        getApiErrorMessage(error, 'Oops.. Something went wrong.'),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <NameField form={form} />
        <EmailField form={form} />
        <PasswordField form={form} />
        <div className="flex items-center gap-x-3.5">
          <Button>Registration</Button>
          <Link
            href={ROUTES.signIn}
            className="text-[10px] underline text-gray-text"
          >
            Already have an account?
          </Link>
        </div>
      </form>
      {error && <p>{error}</p>}
    </AuthWrapper>
  );
};

export default SignUpPage;
