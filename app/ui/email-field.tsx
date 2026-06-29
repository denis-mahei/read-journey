import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SignInRequest } from '@/types/types';

type EmailFieldProps = {
  form: UseFormReturn<SignInRequest>;
};

const EmailField = ({ form }: EmailFieldProps) => {
  const {
    register,
    formState: { errors },
  } = form;
  return (
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
  );
};

export default EmailField;
