import React from 'react';
import Image from 'next/image';

const ProgressStaticText = () => {
  return (
    <div className="w-full flex flex-col md:w-1/2">
      <h2 className="text-md font-bold mb-3.5">Progress</h2>
      <p className="text-sm text-gray-text mb-5 md:mb-10">
        Here you will see when and how much you read. To record, click
        on the red button above.
      </p>
      <div className="rounded-full bg-input-bg p-6 flex justify-center self-center items-center mb-5">
        <Image
          src="/images/star.png"
          alt="star"
          width={32}
          height={32}
        />
      </div>
    </div>
  );
};

export default ProgressStaticText;
