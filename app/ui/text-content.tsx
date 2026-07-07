import React from 'react';
import LinkToHome from '@/app/ui/link-to-home';
import Wrapper from '@/app/ui/wrapper';

const TextContent = () => {
  return (
    <Wrapper className="md:w-1/2">
      <h2 className="text-md font-bold mb-5">Start your workout</h2>
      <ul>
        <li className="flex gap-3 mb-5">
          <h4 className="flex justify-center items-center text-md font-bold rounded-full w-10 h-10 bg-primary p-4 text-secondary-bg">
            1
          </h4>
          <p className="text-sm">
            Create a personal library:{' '}
            <span className="text-gray-text">
              add the books you intend to read to it.
            </span>
          </p>
        </li>
        <li className="flex gap-3 mb-5">
          <h4 className="flex justify-center items-center text-md font-bold rounded-full w-10 h-10 bg-primary p-4 text-secondary-bg">
            2
          </h4>
          <p className="text-sm">
            Create your first workout:{' '}
            <span className="text-gray-text">
              define a goal, choose a period, start training.
            </span>
          </p>
        </li>
      </ul>
      <LinkToHome label={'My library'} />
    </Wrapper>
  );
};

export default TextContent;
