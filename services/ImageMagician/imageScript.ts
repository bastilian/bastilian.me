import { log } from "../../utilities/helpers.ts";

import { Image } from "imagescript";

const getGeometry = ({ size, height, width }) => {
  const sizeMatch = size?.match(/(\d+)x(\d+)/);
  return sizeMatch
    ? [
      parseFloat(sizeMatch?.[1] || width),
      parseFloat(sizeMatch?.[2] || height),
    ]
    : [width, height];
};

export const resize = async (image, options) => {
  const imageDecoded = await Image.decode(image);
  const [width, height] = getGeometry(options);

  try {
    imageDecoded.resize(width, height);
  } catch (e) {
    log("Error resising", e.message);
  }

  return await imageDecoded.encoded();
};

export const crop = async (image, options) => {
  const imageDecoded = await Image.decode(image);
  const [width, height] = getGeometry(options);
  try {
    imageDecoded.crop(height / 2, width / 2, width, height);
  } catch (e) {
    log("Error cropping", e.message);
  }

  return await imageDecoded.encode();
};

export const thumbnail = async (image, options) => {
  const imageDecoded = await Image.decode(image);
  const [width, height] = getGeometry(options);

  try {
    imageDecoded.cover(width, height);
  } catch (e) {
    log("Error transforming to cover", e.message);
  }

  return await imageDecoded.encode();
};

const imageTransformations = {
  "resize": resize,
  "crop": crop,
  "thumbnail": thumbnail,
};

export default async (imageBuffer, transforms = [], fileType = "PNG") => {
  let image = imageBuffer;

  for await (const { operation, ...options } of transforms) {
    log("Transforming", operation, options);
    image = await imageTransformations[operation](image, options);
  }

  return image;
};
