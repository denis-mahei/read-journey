import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import Field from '@/app/ui/field';

interface EmailFieldProps {
  form: UseFormReturn<any>;
  label: string;
}

const EmailField = ({ form, label }: EmailFieldProps) => {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <Field
      htmlFor={'email'}
      label={label}
      errors={
        errors.email && (
          <small className="px-3 text-xs text-red-600">
            {String(errors.email?.message)}
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
