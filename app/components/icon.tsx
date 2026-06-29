interface IconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
  viewBox?: string;
}

const Icon = ({
  name,
  width,
  height,
  viewBox = '0 0 18 18',
  className,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      focusable="false"
      viewBox={viewBox}
    >
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;
