import React from 'react';

interface HeadingProps {
  title: string;
  subtitle: string;
}

const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <h1 className="text-3xl font-bold max-w-73.75 md:max-w-111 md:text-6xl mb-5 md:mb-10">
      {title} <span className="text-span">{subtitle}</span>
    </h1>
  );
};

export default Heading;
