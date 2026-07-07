import React from 'react';
import Image from 'next/image';

const EmptyLib = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-46">
      <div className="p-6 rounded-full bg-input-bg flex justify-center items-center mb-2.5">
        <Image
          src="/images/books-desktop.png"
          alt="books"
          width={68}
          height={68}
          className="hidden md:block"
        />
        <Image
          src="/images/books-mobile.png"
          alt="books"
          width={50}
          height={50}
          className="md:hidden"
        />
      </div>
      <p className="text-center text-sm">
        To start training, add{' '}
        <span className="text-gray-text">some of your books</span> or
        from the recommended ones
      </p>
    </div>
  );
};

export default EmptyLib;
