import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SignUpRequest } from '@/types/definitions';

interface NameFieldProps {
  form: UseFormReturn<SignUpRequest>;
}

const NameField = ({ form }: NameFieldProps) => {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-x-2 bg-input-bg rounded-xl p-3.5 ring-1 ring-transparent lg:hover:ring-light-gr focus-within:ring-gray-border">
        <label htmlFor="name" className="text-xs text-gray-text">
          Name:
        </label>

        <input
          placeholder="Your name"
          id="name"
          className="flex-1 outline-0"
          {...register('name', {
            required: 'Name is required!',
            validate: {
              minLength: (v) =>
                v.length >= 3 ||
                'The name should have minimum 3 letters!',
              matchPattern: (v) =>
                /^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґA-ZА-ЯІЇЄҐ]+$/.test(v) ||
                'The name must start with an uppercase letter and contain only letters',
            },
          })}
        />
      </div>
      {errors.name?.type === 'required' && (
        <small className="text-xs text-red-600 px-3">
          {errors.name.message}
        </small>
      )}
      {errors.name?.type === 'minLength' && (
        <small className="text-xs text-orange-400 px-3">
          {errors.name.message}
        </small>
      )}
      {errors.name?.type === 'matchPattern' && (
        <small className="text-xs text-yellow-400 px-3">
          {errors.name.message}
        </small>
      )}
    </div>
  );
};

export default NameField;
