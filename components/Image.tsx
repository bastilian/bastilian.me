import type { JSX } from "preact";

type ImageProps = {
  src: string;
  params?: any;
  className?: string;
};

const Image = (
  {
    src,
    params,
    ...props
  }: ImageProps,
): JSX.Element => {
  const imageParams = new URLSearchParams();
  imageParams.append("image", encodeURIComponent(src));

  Object.entries(params).forEach(([key, value]) => {
    imageParams.append(key, value as string);
  });
  const randomNumber = `${Date.now() + (Math.random() * 100000)}`;

  return src
    ? (
      <img
        src={`/api/image/${
          parseInt(randomNumber)
        }.png?${imageParams.toString()}`}
        {...props}
      />
    )
    : <></>;
};

export default Image;
