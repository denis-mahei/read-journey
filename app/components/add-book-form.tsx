'use client';

import React from 'react';
import Field from '@/app/ui/field';
import Button from '@/app/ui/button';
import { useForm } from 'react-hook-form';
import { addBook } from '@/services/client-api';

interface FormInput {
  title: string;
  author: string;
  pages: number;
}

const AddBookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onAdd = async (formInputs: FormInput) => {
    const { title, author, pages } = formInputs;
    const { data } = await addBook({
      title,
      author,
      totalPages: Number(pages),
    });
    return data;
  };

  return (
    <div className="mb-5">
      <h4 className="text-[10px] capitalize ml-3.5 mb-2">Add:</h4>
      <form onSubmit={handleSubmit(onAdd)}>
        <Field label={'Book title:'} htmlFor={'title'}>
          <input
            {...register('title', { required: true })}
            type="text"
            id="title"
            placeholder="Enter title"
            className="outline-none w-1/2"
          />
        </Field>
        <div className="h-2" />
        <Field label={'Book author:'} htmlFor={'author'}>
          <input
            {...register('author', { required: true })}
            type="text"
            id="author"
            placeholder="Enter author"
            className="outline-none w-1/2"
          />
        </Field>
        <div className="h-2" />
        <Field label={'Number of pages'} htmlFor={'pages'}>
          <input
            {...register('pages', { required: true, min: 1 })}
            type="number"
            id="pages"
            placeholder="Enter pages:"
            className="outline-none w-1/2"
          />
        </Field>

        <div className="h-5" />
        <Button variant="secondary" type="submit">
          Add book
        </Button>
      </form>
    </div>
  );
};

export default AddBookForm;
