import React, { useState } from 'react';
import { SignInRequest } from '@/types/definitions';
import { UseFormReturn } from 'react-hook-form';
import Icon from '@/app/ui/icon';
import clsx from 'clsx';

interface PasswordFieldProps {
  form: UseFormReturn<any>;
}

const PasswordField = ({ form }: PasswordFieldProps) => {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    watch,
    formState: { errors, touchedFields },
  } = form;
  const passwordValue = watch('password');
  const isPasswordTouched = !!touchedFields.password;

  const isPasswordValid =
    isPasswordTouched &&
    !errors.password &&
    passwordValue &&
    passwordValue.length >= 7 &&
    passwordValue.length <= 16;

  const passwordError = errors.password;
  const passwordErrorType = passwordError?.type;
  const passwordErrorMessage = passwordError?.message;
  return (
    <div className="flex flex-col gap-1 mb-5">
      <div
        className={clsx(
          'flex items-center bg-input-bg rounded-xl p-3.5 ring-1',
          {
            'ring-red-500': passwordError,
            'ring-green-500': isPasswordValid,
            'ring-gray-border': !passwordError && !isPasswordValid,
            'lg:hover:ring-light-gr focus-within:ring-light-gr':
              !passwordError && !isPasswordValid,
          },
        )}
      >
        <label htmlFor="password" className="text-sm text-gray-text">
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

        <button onClick={() => setShowPass(!showPass)} type="button">
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
          {String(passwordErrorMessage)}
        </small>
      )}
      {passwordErrorType === 'minLength' && (
        <small className="text-xs text-red-500 px-3">
          {String(passwordErrorMessage)}
        </small>
      )}
      {isPasswordValid && (
        <small className="text-xs text-green-600 px-3">
          Password is secure!
        </small>
      )}
    </div>
  );
};

export default PasswordField;
