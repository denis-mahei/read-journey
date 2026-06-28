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
import { useForm } from 'react-hook-form';
import Icon from '@/app/components/icon';
import clsx from 'clsx';
import Button from '@/app/ui/button';

const SignInPage = () => {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<SignInRequest>({
    mode: 'onTouched',
  });

  const passwordValue = watch('password');
  const isPasswordTouched = !!touchedFields.password;

  const isPasswordValid =
    isPasswordTouched &&
    !errors.password &&
    passwordValue &&
    passwordValue.length >= 7 &&
    passwordValue.length <= 16;

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

  const passwordError = errors.password;
  const passwordErrorType = passwordError?.type;
  const passwordErrorMessage = passwordError?.message;

  return (
    <AuthWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-x-2 bg-input-bg rounded-xl p-3.5 ring-1 ring-transparent lg:hover:ring-light-gr focus-within:ring-gray-border">
            <label htmlFor="email" className="text-xs text-gray-text">
              Mail:
            </label>

            <input
              placeholder="Your@email.com"
              id="email"
              className="flex-1 outline-0"
              {...register('email', {
                required: 'Email is required!',
                validate: {
                  maxLength: (v) =>
                    v.length <= 50 ||
                    'The email should have at most 50 characters',
                  matchPattern: (v) =>
                    /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v) ||
                    'Invalid email format',
                },
              })}
            />
          </div>
          {errors.email?.type === 'required' && (
            <small className="text-xs text-red-600 px-3">
              {errors.email.message}
            </small>
          )}
          {errors.email?.type === 'maxLength' && (
            <small className="text-xs text-red-600 px-3">
              {errors.email.message}
            </small>
          )}
          {errors.email?.type === 'matchPattern' && (
            <small className="text-xs text-red-600 px-3">
              {errors.email.message}
            </small>
          )}
        </div>
        <div className="flex flex-col gap-1 mb-18">
          <div
            className={clsx(
              'flex items-center bg-input-bg rounded-xl p-3.5 ring-1',
              {
                'ring-red-500': passwordError,
                'ring-green-500': isPasswordValid,
                'ring-gray-border':
                  !passwordError && !isPasswordValid,
                'lg:hover:ring-light-gr focus-within:ring-light-gr':
                  !passwordError && !isPasswordValid,
              },
            )}
          >
            <label
              htmlFor="password"
              className="text-sm text-gray-text"
            >
              Password:
            </label>

            <input
              className="w-full outline-0 px-2.5"
              id="password"
              type={showPass ? 'text' : 'password'}
              placeholder="Yourpasswordhere"
              {...register('password', {
                required: 'Password is required',
                validate: {
                  minLength: (v) =>
                    v.length >= 7 || 'Enter a valid password*',
                  maxLength: (v) => v.length <= 16,
                },
              })}
            />
            {passwordError && (
              <Icon
                name="warn"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                className="mr-2.5"
              />
            )}

            {!passwordError && isPasswordValid && (
              <Icon
                name="success"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                className="mr-2.5"
              />
            )}

            <button
              onClick={() => setShowPass(!showPass)}
              type="button"
            >
              {showPass ? (
                <Icon
                  name="eye-open"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                />
              ) : (
                <Icon
                  name="eye-close"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                />
              )}
            </button>
          </div>
          {passwordErrorType === 'required' && (
            <small className="text-xs text-red-600 px-3">
              {passwordErrorMessage}
            </small>
          )}
          {passwordErrorType === 'minLength' && (
            <small className="text-xs text-red-500 px-3">
              {passwordErrorMessage}
            </small>
          )}
          {isPasswordValid && (
            <small className="text-xs text-green-600 px-3">
              Password is secure!
            </small>
          )}
        </div>
        <div className="flex items-center gap-x-3.5">
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
