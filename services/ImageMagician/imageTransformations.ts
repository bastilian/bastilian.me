import {
  MagickGeometry,
} from "https://deno.land/x/imagemagick_deno@0.0.19/mod.ts";

export const resize = (image, { size, height, width }) => {
  const sizeOptions = size ? [size] : [
    width,
    height,
  ];
  const sizingData = new MagickGeometry(...sizeOptions);
  image.resize(sizingData);

  return image;
};

export const crop = (image, { size, height, width }) => {
  const sizeOptions = size ? [size] : [
    width,
    height,
  ];
  const sizingData = new MagickGeometry(...sizeOptions);
  image.crop(sizingData);

  return image;
};

export const thumbnail = (image, { size, height, width }) => {
  const sizeOptions = size ? [size] : [
    width,
    height,
  ];
  const sizingData = new MagickGeometry(...sizeOptions);
  image.resize(sizingData);
  image.crop(sizingData);

  return image;
};

export default {
  "resize": resize,
  "crop": crop,
  "thumbnail": thumbnail,
};
