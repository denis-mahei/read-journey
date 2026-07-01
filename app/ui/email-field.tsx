import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SignInRequest } from '@/types/definitions';
import Field from '@/app/ui/field';

type EmailFieldProps = {
  form: UseFormReturn<SignInRequest>;
  label: string;
};

const EmailField = ({ form }: EmailFieldProps) => {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <Field
      htmlFor={'email'}
      label={'Email'}
      errors={
        errors.email && (
          <small className="px-3 text-xs text-red-600">
            {errors.email.message}
          </small>
        )
      }
    >
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
    </Field>
  );
};

export default EmailField;
