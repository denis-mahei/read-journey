import React from 'react';
import Field from '@/app/ui/field';
import Button from '@/app/ui/button';

const AddBookForm = () => {
  return (
    <div className="mb-5">
      <h4 className="text-[10px] capitalize ml-3.5 mb-2">Add:</h4>
      <form>
        <Field label={'Book title:'} htmlFor={'title'}>
          <input
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
            type="text"
            id="author"
            name="author"
            placeholder="Enter author"
            className="outline-none w-1/2"
          />
        </Field>
        <div className="h-2" />
        <Field label={'Number of pages'} htmlFor={'pages'}>
          <input
            type="text"
            id="pages"
            name="pages"
            placeholder="Enter pages:"
            className="outline-none w-1/2"
          />
        </Field>

        <div className="h-5" />
        <Button variant="secondary">Add book</Button>
      </form>
    </div>
  );
};

export default AddBookForm;
