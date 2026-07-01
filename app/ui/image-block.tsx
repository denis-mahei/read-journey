import Image from 'next/image';

const ImageBlock = () => {
  return (
    <div className="min-h-99 flex md:hidden lg:flex  items-center justify-center w-full lg:w-1/2 bg-secondary-bg rounded-4xl relative overflow-hidden">
      <Image
        className="hidden lg:flex lg:absolute lg:-bottom-45 left-1/2 -translate-x-1/2"
        src="/images/iphone-desktop.png"
        alt="iphone-picture"
        width={405}
        height={834}
        loading="lazy"
      />
      <Image
        className="flex md:hidden absolute -bottom-45 left-1/2 -translate-x-1/2"
        src="/images/iphone-mobile.png"
        alt="iphone-picture"
        width={255}
        height={518}
        loading="lazy"
      />
    </div>
  );
};

export default ImageBlock;
