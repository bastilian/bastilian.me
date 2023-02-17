import { MagickGeometry } from "imagemagick";

const getGeometry = ({ size, height, width }) => {
  const sizeOptions = size ? [size] : [
    width,
    height,
  ];

  return new MagickGeometry(...sizeOptions);
};

export const resize = (image, options) => {
  image.resize(getGeometry(options));

  return image;
};

export const crop = (image, options) => {
  image.crop(getGeometry(options));

  return image;
};

export const thumbnail = (image, options) => {
  const sizingData = getGeometry(options);
  image.resize(sizingData, options.gravity);
  image.crop(sizingData, options.gravity);

  return image;
};

export default {
  "resize": resize,
  "crop": crop,
  "thumbnail": thumbnail,
};
