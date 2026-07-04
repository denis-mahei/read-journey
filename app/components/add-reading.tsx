'use client';

import React from 'react';
import Field from '@/app/ui/field';
import { useForm } from 'react-hook-form';
import Button from '@/app/ui/button';
import axios from 'axios';
import { toast } from 'sonner';

interface AddReadingProps {
  onReading: (data: AddReadingInput) => Promise<void>;
  isReading: boolean;
}

export interface AddReadingInput {
  page: number;
}

const AddReading = ({ isReading, onReading }: AddReadingProps) => {
  const { register, handleSubmit, reset } =
    useForm<AddReadingInput>();

  const onSubmit = async ({ page }: AddReadingInput) => {
    try {
      await onReading({ page });
      toast.success('Reading added successfully.');
      reset();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error);
      } else {
        toast.error('Something went wrong!');
      }
      throw err;
    }
  };

  return (
    <div>
      <h2 className="text-[10px] ml-3.5 mb-2">
        {isReading ? 'Stop page:' : 'Start page:'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field label="Page number:" htmlFor="page">
          <input type="number" id="page" {...register('page')} />
        </Field>
        <div className="h-5" />
        <Button variant="secondary">
          {isReading ? 'To stop' : 'To start'}
        </Button>
      </form>
    </div>
  );
};

export default AddReading;
