'use client';

import { useForm } from 'react-hook-form';
import Field from '@/app/ui/field';
import Button from '@/app/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

type FilterInputs = {
  title: string;
  author: string;
};

const FilterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit } = useForm<FilterInputs>({
    defaultValues: {
      title: searchParams.get('title') ?? '',
      author: searchParams.get('author') ?? '',
    },
  });

  const onSubmit = (data: FilterInputs) => {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (data.title) params.set('title', data.title);
    if (data.author) params.set('author', data.author);

    router.push(`/recommended?${params.toString()}`);
  };

  return (
    <div className="mb-5 md:w-1/2 lg:w-full">
      <h4 className="text-[10px] capitalize ml-3.5 mb-2">filters:</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field label={'Book title:'} htmlFor={'title'}>
          <input
            {...register('title')}
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            className="outline-none w-1/2"
          />
        </Field>
        <div className="h-2" />
        <Field label={'Book author:'} htmlFor={'author'}>
          <input
            {...register('author')}
            type="text"
            id="author"
            name="author"
            placeholder="Enter author"
            className="outline-none w-1/2"
          />
        </Field>
        <div className="h-5" />
        <Button variant="secondary" type="submit">
          To apply
        </Button>
      </form>
    </div>
  );
};

export default FilterForm;
