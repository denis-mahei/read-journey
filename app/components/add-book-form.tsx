'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import Field from '@/app/ui/field';
import Button from '@/app/ui/button';
import SuccessModal from '@/app/ui/success-modal';
import { FormInput } from '@/app/components/library-content';
import axios from 'axios';
import { toast } from 'sonner';

type AddBookFormProps = {
  isSuccess: boolean;
  onSuccess: (isSuccess: boolean) => void;
  onAdd: (newBook: FormInput) => Promise<void>;
};

const AddBookForm = ({
  isSuccess,
  onSuccess,
  onAdd,
}: AddBookFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    mode: 'onBlur',
  });

  const onSubmit = async (newBook: FormInput) => {
    try {
      await onAdd(newBook);
      reset();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error);
      } else {
        toast.error('Something went wrong!');
      }
    }
  };

  return (
    <>
      <div className="mb-5 md:mb-0 md:w-80">
        <h4 className="text-[10px] capitalize ml-3.5 mb-2 md:text-sm">
          Create your library:
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            label={'Book title:'}
            htmlFor={'title'}
            errors={
              errors.title && (
                <small className="text-red-600">
                  {errors.title?.message}
                </small>
              )
            }
          >
            <input
              {...register('title', {
                required: 'Title is required',
                validate: {
                  minLength: (v) =>
                    v.length > 3 ||
                    'Title must be min 3' + ' characters length',
                },
              })}
              type="text"
              id="title"
              placeholder="Enter title"
              className="outline-none w-1/2"
            />
          </Field>
          <div className="h-2" />
          <Field label={'Book author:'} htmlFor={'author'}>
            <input
              {...register('author', {
                required: true,
                validate: {
                  minLength: (value) =>
                    value.length >= 3 ||
                    'Name of author must' + ' be minimum 3 letters',
                },
              })}
              type="text"
              id="author"
              placeholder="Enter author"
              className="outline-none w-1/2"
            />
          </Field>
          <div className="h-2" />
          <Field
            label={'Number of pages'}
            htmlFor={'pages'}
            errors={
              errors.pages && (
                <small className="text-red-600">
                  {errors.pages.message}
                </small>
              )
            }
          >
            <input
              {...register('pages', {
                required: true,
                validate: {
                  minLength: (v) =>
                    v >= 5 || 'Total pages must be minimum 5 pages',
                },
              })}
              type="number"
              id="pages"
              placeholder="Enter pages:"
              className="outline-none w-1/2"
            />
          </Field>

          <div className="h-5" />
          <Button
            variant="secondary"
            type="submit"
            onClick={() => reset({ ...onAdd })}
          >
            Add book
          </Button>
        </form>
      </div>
      {isSuccess && <SuccessModal onClose={() => onSuccess(false)} />}
    </>
  );
};

export default AddBookForm;
