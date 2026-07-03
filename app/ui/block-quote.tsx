import React from 'react';
import Image from 'next/image';

const BlockQuote = () => {
  return (
    <div className="hidden lg:flex lg:gap-3.5 bg-input-bg rounded-xl px-5 py-3.5 lg:items-center">
      <Image
        src="/images/books-desktop.png"
        alt="Books"
        width={40}
        height={40}
      />
      <h5 className="text-sm text-gray-text">
        &#34;Books are <span className="text-primary">windows</span>{' '}
        to the world, and reading is a journey into the unknown.&#34;
      </h5>
    </div>
  );
};

export default BlockQuote;
